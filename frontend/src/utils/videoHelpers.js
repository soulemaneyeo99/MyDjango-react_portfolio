// ========== frontend/src/utils/videoHelpers.js ==========
/**
 * Utility functions for handling video URLs and types
 */

/**
 * Detect the type of video from a URL
 * @param {string} url - The video URL
 * @returns {string} - 'youtube', 'vimeo', 'local', or 'unknown'
 */
export const getVideoType = (url) => {
    if (!url) return 'none';

    // YouTube patterns
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        return 'youtube';
    }

    // Vimeo patterns
    if (url.includes('vimeo.com')) {
        return 'vimeo';
    }

    // Local video file extensions
    if (url.match(/\.(mp4|webm|ogg|mov)$/i)) {
        return 'local';
    }

    return 'unknown';
};

/**
 * Extract YouTube video ID from various URL formats
 * @param {string} url - YouTube URL
 * @returns {string|null} - Video ID or null
 */
export const getYouTubeId = (url) => {
    if (!url) return null;

    // Handle youtu.be short links
    const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (shortMatch) return shortMatch[1];

    // Handle youtube.com/watch?v= links
    const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    if (watchMatch) return watchMatch[1];

    // Handle youtube.com/embed/ links
    const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
    if (embedMatch) return embedMatch[1];

    return null;
};

/**
 * Extract Vimeo video ID from URL
 * @param {string} url - Vimeo URL
 * @returns {string|null} - Video ID or null
 */
export const getVimeoId = (url) => {
    if (!url) return null;

    // Handle vimeo.com/123456 format
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : null;
};

/**
 * Generate proper embed URL for video platforms
 * @param {string} url - Original video URL
 * @param {string} type - Video type ('youtube', 'vimeo', 'local')
 * @returns {string|null} - Embed URL or original URL for local
 */
export const generateEmbedUrl = (url, type) => {
    if (!url) return null;

    switch (type) {
        case 'youtube': {
            const videoId = getYouTubeId(url);
            return videoId
                ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`
                : null;
        }

        case 'vimeo': {
            const videoId = getVimeoId(url);
            return videoId
                ? `https://player.vimeo.com/video/${videoId}`
                : null;
        }

        case 'local':
            return url; // Return as-is for local videos

        default:
            return null;
    }
};

/**
 * Get video thumbnail URL
 * @param {string} url - Video URL
 * @param {string} type - Video type
 * @param {string} customThumbnail - Custom thumbnail URL (optional)
 * @returns {string|null} - Thumbnail URL
 */
export const getVideoThumbnail = (url, type, customThumbnail = null) => {
    if (customThumbnail) return customThumbnail;

    switch (type) {
        case 'youtube': {
            const videoId = getYouTubeId(url);
            return videoId
                ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                : null;
        }

        case 'vimeo': {
            // Vimeo thumbnails require API call, return null for now
            // Can be enhanced later with Vimeo API integration
            return null;
        }

        default:
            return null;
    }
};
