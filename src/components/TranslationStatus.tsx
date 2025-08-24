import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { LibreTranslationService } from '@/services/translationService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Database, 
  Trash2, 
  RefreshCw, 
  Globe, 
  Clock, 
  HardDrive,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface CacheStats {
  totalEntries: number;
  totalSize: number;
}

const TranslationStatus: React.FC = () => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const [cacheStats, setCacheStats] = useState<CacheStats>({ totalEntries: 0, totalSize: 0 });
  const [isCleaning, setIsCleaning] = useState(false);
  const [lastCleanup, setLastCleanup] = useState<Date | null>(null);

  useEffect(() => {
    updateCacheStats();
  }, []);

  const updateCacheStats = () => {
    const stats = LibreTranslationService.getCacheStats();
    setCacheStats(stats);
  };

  const handleCleanupCache = () => {
    setIsCleaning(true);
    try {
      LibreTranslationService.cleanupCache();
      updateCacheStats();
      setLastCleanup(new Date());
    } catch (error) {
      console.error('Cache cleanup failed:', error);
    } finally {
      setIsCleaning(false);
    }
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCacheHealth = () => {
    if (cacheStats.totalEntries === 0) return 'empty';
    if (cacheStats.totalEntries < 10) return 'good';
    if (cacheStats.totalEntries < 50) return 'moderate';
    return 'high';
  };

  const getCacheHealthColor = (health: string) => {
    switch (health) {
      case 'empty': return 'bg-gray-100 text-gray-600';
      case 'good': return 'bg-green-100 text-green-700';
      case 'moderate': return 'bg-yellow-100 text-yellow-700';
      case 'high': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getCacheHealthText = (health: string) => {
    switch (health) {
      case 'empty': return t('translation.status.cache.health.empty');
      case 'good': return t('translation.status.cache.health.good');
      case 'moderate': return t('translation.status.cache.health.moderate');
      case 'high': return t('translation.status.cache.health.high');
      default: return t('translation.status.cache.health.unknown');
    }
  };

  return (
    <Card className={`${theme === 'dark' ? 'bg-card border-border' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <CardTitle className={`flex items-center space-x-2 ${
          theme === 'dark' ? 'text-foreground' : 'text-gray-900'
        }`}>
          <Globe className="h-5 w-5 text-primary" />
          <span>
            {t('translation.status.title')}
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Service Status */}
        <div className={`p-3 rounded-lg ${
          theme === 'dark' 
            ? 'bg-green-900/20 border border-green-500/30' 
            : 'bg-green-50 border border-green-200'
        }`}>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className={`text-sm font-medium ${
              theme === 'dark' ? 'text-green-300' : 'text-green-700'
            }`}>
              {t('translation.status.service.active')}
            </span>
          </div>
        </div>

        {/* Cache Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`text-center p-3 rounded-lg ${
            theme === 'dark' ? 'bg-card border border-border' : 'bg-gray-50 border border-gray-200'
          }`}>
            <Database className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <div className={`text-lg font-bold ${
              theme === 'dark' ? 'text-foreground' : 'text-gray-900'
            }`}>
              {cacheStats.totalEntries}
            </div>
            <div className={`text-xs ${
              theme === 'dark' ? 'text-muted-foreground' : 'text-gray-600'
            }`}>
              {t('translation.status.cache.entries')}
            </div>
          </div>

          <div className={`text-center p-3 rounded-lg ${
            theme === 'dark' ? 'bg-card border border-border' : 'bg-gray-50 border border-gray-200'
          }`}>
            <HardDrive className="h-6 w-6 mx-auto mb-2 text-purple-500" />
            <div className={`text-lg font-bold ${
              theme === 'dark' ? 'text-foreground' : 'text-gray-900'
            }`}>
              {formatBytes(cacheStats.totalSize)}
            </div>
            <div className={`text-xs ${
              theme === 'dark' ? 'text-muted-foreground' : 'text-gray-600'
            }`}>
              {t('translation.status.cache.size')}
            </div>
          </div>

          <div className={`text-center p-3 rounded-lg ${
            theme === 'dark' ? 'bg-card border border-border' : 'bg-gray-50 border border-gray-200'
          }`}>
            <AlertCircle className="h-6 w-6 mx-auto mb-2 text-orange-500" />
            <div className="mb-2">
              <Badge className={getCacheHealthColor(getCacheHealth())}>
                {getCacheHealthText(getCacheHealth())}
              </Badge>
            </div>
            <div className={`text-xs ${
              theme === 'dark' ? 'text-muted-foreground' : 'text-gray-600'
            }`}>
              {t('translation.status.cache.health')}
            </div>
          </div>
        </div>

        {/* Cache Management */}
        <div className={`p-4 rounded-lg ${
          theme === 'dark' ? 'bg-card border border-border' : 'bg-gray-50 border border-gray-200'
        }`}>
          <h4 className={`font-semibold mb-3 ${
            theme === 'dark' ? 'text-foreground' : 'text-gray-900'
          }`}>
            {t('translation.status.cache.management.title')}
          </h4>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleCleanupCache}
              disabled={isCleaning || cacheStats.totalEntries === 0}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              {isCleaning ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
              <span>
                {isCleaning ? 
                  t('translation.status.cache.management.cleaning') :
                  t('translation.status.cache.management.clean')
                }
              </span>
            </Button>

            <Button
              onClick={updateCacheStats}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>
                {t('translation.status.cache.management.refresh')}
              </span>
            </Button>
          </div>

          {lastCleanup && (
            <div className={`mt-3 text-xs ${
              theme === 'dark' ? 'text-muted-foreground' : 'text-gray-500'
            }`}>
              <Clock className="h-3 w-3 inline mr-1" />
              {t('translation.status.cache.lastCleanup', { date: lastCleanup.toLocaleString() })}
            </div>
          )}
        </div>

        {/* Information */}
        <div className={`text-xs ${
          theme === 'dark' ? 'text-muted-foreground' : 'text-gray-500'
        }`}>
          <p>
            {t('translation.status.info.cache.performance')}
          </p>
          <p>
            {t('translation.status.info.cache.autoClean')}
          </p>
          <p>
            {t('translation.status.info.libreTranslate')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TranslationStatus; 