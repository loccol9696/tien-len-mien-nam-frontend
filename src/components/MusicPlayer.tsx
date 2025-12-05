import React, { useState, useRef, useEffect } from "react";

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Danh sách các nguồn nhạc Tết (thử từng cái nếu cái trước không hoạt động)
  // Bạn có thể thêm file nhạc vào thư mục public và sử dụng '/tet-music.mp3'
  const musicSources = [
    "/tet-music.mp3", // File local trong thư mục public (ưu tiên)
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Backup URL
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleError = () => {
      setError(
        "Không thể phát nhạc. Vui lòng thêm file nhạc vào thư mục public/tet-music.mp3"
      );
      setIsPlaying(false);
    };

    const handleCanPlay = () => {
      setError(null);
    };

    audio.addEventListener("error", handleError);
    audio.addEventListener("canplay", handleCanPlay);

    return () => {
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Error playing music:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <>
      <audio ref={audioRef} loop onEnded={() => setIsPlaying(false)}>
        {musicSources.map((src, index) => (
          <source key={index} src={src} type="audio/mpeg" />
        ))}
      </audio>

      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        {isExpanded ? (
          <div className="bg-white rounded-lg shadow-2xl p-3 sm:p-4 border-2 border-tet-red min-w-[260px] sm:min-w-[280px] max-w-[calc(100vw-2rem)] animate-slide-up">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <h3 className="text-base sm:text-lg font-bold text-tet-red flex items-center gap-2">
                🎵 Nhạc Tết
              </h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors text-lg sm:text-xl flex-shrink-0"
                aria-label="Đóng"
              >
                ×
              </button>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <button
                onClick={togglePlay}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-tet-red text-white flex items-center justify-center hover:bg-tet-dark-red transition-colors shadow-lg flex-shrink-0"
                aria-label={isPlaying ? "Tạm dừng" : "Phát"}
              >
                {isPlaying ? "⏸️" : "▶️"}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 sm:gap-2 mb-1">
                  <span className="text-xs sm:text-sm text-gray-600 flex-shrink-0">
                    🔊
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-tet-red"
                  />
                  <span className="text-xs text-gray-500 w-7 sm:w-8 flex-shrink-0">
                    {Math.round(volume * 100)}%
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center">
              {isPlaying ? "Đang phát nhạc Tết... 🎊" : "Nhấn để phát nhạc Tết"}
            </p>
            {error && (
              <p className="text-xs text-red-500 text-center mt-2 bg-red-50 p-2 rounded break-words">
                {error}
              </p>
            )}
          </div>
        ) : (
          <button
            onClick={() => setIsExpanded(true)}
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-tet-red text-white flex items-center justify-center hover:bg-tet-dark-red transition-all shadow-2xl hover:scale-110 text-xl sm:text-2xl animate-pulse"
            title="Nhạc Tết"
            aria-label="Mở nhạc Tết"
          >
            🎵
          </button>
        )}
      </div>
    </>
  );
};

export default MusicPlayer;
