import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import Button from "../components/Button";
import Card from "../components/Card";
import Modal from "../components/Modal";
import Input from "../components/Input";

const Home: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Modal states
  const [isGiftcodeModalOpen, setIsGiftcodeModalOpen] = useState(false);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [isFriendsModalOpen, setIsFriendsModalOpen] = useState(false);
  const [isLeaderboardModalOpen, setIsLeaderboardModalOpen] = useState(false);

  // Giftcode state
  const [giftcode, setGiftcode] = useState("");
  const [isSubmittingGiftcode, setIsSubmittingGiftcode] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsDropdownOpen(false);
  };

  const handleAccountManagement = () => {
    // Navigate to account management page
    navigate("/account");
    setIsDropdownOpen(false);
  };

  const handleWallet = () => {
    // Navigate to wallet page
    navigate("/wallet");
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Giftcode handlers
  const handleGiftcodeSubmit = async () => {
    if (!giftcode.trim()) {
      showError("Vui lòng nhập mã giftcode");
      return;
    }

    setIsSubmittingGiftcode(true);
    try {
      // TODO: Call API to redeem giftcode
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      showSuccess("Đổi giftcode thành công! Bạn đã nhận được phần thưởng.");
      setGiftcode("");
      setIsGiftcodeModalOpen(false);
    } catch (error) {
      showError("Giftcode không hợp lệ hoặc đã được sử dụng");
    } finally {
      setIsSubmittingGiftcode(false);
    }
  };

  // Mock data for friends
  const friends = [
    { id: 1, name: "Nguyễn Văn A", avatar: "👤", status: "online", level: 15 },
    { id: 2, name: "Trần Thị B", avatar: "👤", status: "offline", level: 22 },
    { id: 3, name: "Lê Văn C", avatar: "👤", status: "online", level: 18 },
    { id: 4, name: "Phạm Thị D", avatar: "👤", status: "online", level: 30 },
  ];

  // Mock data for leaderboard - Thắng nhiều nhất trong ngày
  const leaderboard = [
    {
      rank: 1,
      name: "Nguyễn Văn A",
      wins: 45,
      level: 50,
      avatar: "👤",
    },
    {
      rank: 2,
      name: "Trần Thị B",
      wins: 38,
      level: 45,
      avatar: "👤",
    },
    {
      rank: 3,
      name: "Lê Văn C",
      wins: 35,
      level: 42,
      avatar: "👤",
    },
    {
      rank: 4,
      name: "Phạm Thị D",
      wins: 32,
      level: 38,
      avatar: "👤",
    },
    {
      rank: 5,
      name: "Hoàng Văn E",
      wins: 28,
      level: 35,
      avatar: "👤",
    },
    {
      rank: 6,
      name: "Nguyễn Hữu Lộc",
      wins: 25,
      level: 30,
      avatar: "👤",
    },
    {
      rank: 7,
      name: "Võ Thị F",
      wins: 22,
      level: 28,
      avatar: "👤",
    },
    {
      rank: 8,
      name: "Đặng Văn G",
      wins: 20,
      level: 25,
      avatar: "👤",
    },
  ];

  const currentUserRank =
    leaderboard.findIndex((p) => p.name === "Nguyễn Hữu Lộc") + 1;
  const currentUserData =
    leaderboard.find((p) => p.name === "Nguyễn Hữu Lộc") || leaderboard[5];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-red-50 via-yellow-50 to-red-100">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 text-6xl opacity-20 lantern">
        🏮
      </div>
      <div
        className="absolute top-20 right-20 text-5xl opacity-20 lantern"
        style={{ animationDelay: "1s" }}
      >
        🎋
      </div>
      <div
        className="absolute bottom-20 left-20 text-5xl opacity-20 lantern"
        style={{ animationDelay: "0.5s" }}
      >
        🧧
      </div>
      <div
        className="absolute bottom-10 right-10 text-6xl opacity-20 lantern"
        style={{ animationDelay: "1.5s" }}
      >
        🧧
      </div>
      <div
        className="absolute top-1/2 left-1/4 text-5xl opacity-20 lantern"
        style={{ animationDelay: "0.3s" }}
      >
        🎴
      </div>
      <div
        className="absolute top-1/3 right-1/4 text-5xl opacity-20 lantern"
        style={{ animationDelay: "0.7s" }}
      >
        🎴
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-lg border-b-2 border-tet-gold/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Title */}
            <div className="flex items-center gap-3">
              <div className="text-5xl animate-pulse">🎴</div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-tet-red">
                  Tiến Lên Miền Nam
                </h1>
                <p className="text-sm text-tet-dark-red hidden sm:block">
                  Chúc Mừng Năm Mới!
                </p>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4 relative" ref={dropdownRef}>
              {/* User Info - Clickable */}
              <div
                className="hidden sm:flex items-center gap-3 bg-tet-gold/20 px-4 py-2 rounded-full border border-tet-gold/30 cursor-pointer hover:bg-tet-gold/30 transition-colors relative"
                onClick={toggleDropdown}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-tet-red to-tet-dark-red flex items-center justify-center text-white font-bold text-lg">
                  👤
                </div>
                <div>
                  <p className="text-sm font-semibold text-tet-dark-red">
                    Nguyễn Hữu Lộc
                  </p>
                  <p className="text-xs text-gray-600">Số dư: 100.000đ</p>
                </div>
                <svg
                  className={`w-4 h-4 text-tet-dark-red transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {/* Mobile User Button */}
              <button
                className="sm:hidden w-10 h-10 rounded-full bg-gradient-to-br from-tet-red to-tet-dark-red flex items-center justify-center text-white font-bold text-lg hover:opacity-80 transition-opacity"
                onClick={toggleDropdown}
              >
                👤
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-tet-gold/30 z-50 overflow-hidden">
                  <div className="py-2">
                    <button
                      onClick={handleAccountManagement}
                      className="w-full px-4 py-3 text-left hover:bg-tet-gold/10 transition-colors flex items-center gap-3 text-tet-dark-red"
                    >
                      <span className="font-semibold">Hồ sơ</span>
                    </button>
                    <button
                      onClick={handleWallet}
                      className="w-full px-4 py-3 text-left hover:bg-tet-gold/10 transition-colors flex items-center gap-3 text-tet-dark-red"
                    >
                      <span className="font-semibold">Ví</span>
                    </button>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-left hover:bg-red-50 transition-colors flex items-center gap-3 text-red-600"
                    >
                      <span className="font-semibold">Đăng Xuất</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-tet-dark-red mb-4 flex items-center gap-2">
            <span>Hoạt động chính</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Game Room Card */}
            <Card className="hover:scale-105 transition-transform cursor-pointer">
              <div className="text-center">
                <div className="text-6xl mb-4">🎮</div>
                <h2 className="text-2xl font-bold text-tet-red mb-2">
                  Tạo Phòng
                </h2>
                <p className="text-gray-600 mb-4">
                  Tạo phòng chơi mới và mời bạn bè
                </p>
                <Button variant="secondary" className="w-full">
                  Tạo Phòng
                </Button>
              </div>
            </Card>

            {/* Join Room Card */}
            <Card className="hover:scale-105 transition-transform cursor-pointer">
              <div className="text-center">
                <div className="text-6xl mb-4">🚪</div>
                <h2 className="text-2xl font-bold text-tet-red mb-2">
                  Tham Gia Phòng
                </h2>
                <p className="text-gray-600 mb-4">
                  Tham gia phòng chơi với mã phòng
                </p>
                <Button variant="secondary" className="w-full">
                  Tham Gia
                </Button>
              </div>
            </Card>

            {/* Quick Match Card */}
            <Card className="hover:scale-105 transition-transform cursor-pointer">
              <div className="text-center">
                <div className="text-6xl mb-4">⚡</div>
                <h2 className="text-2xl font-bold text-tet-red mb-2">
                  Chơi Nhanh
                </h2>
                <p className="text-gray-600 mb-4">
                  Tìm phòng chơi ngay lập tức
                </p>
                <Button variant="secondary" className="w-full">
                  Chơi Ngay
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Other Features */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-tet-dark-red mb-4 flex items-center gap-2">
            <span>Tính Năng Khác</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Giftcode Card */}
            <Card
              className="hover:scale-105 transition-transform cursor-pointer h-full flex flex-col"
              onClick={() => setIsGiftcodeModalOpen(true)}
            >
              <div className="relative z-10 text-center flex flex-col h-full">
                <div className="text-6xl mb-4">🎁</div>
                <h2 className="text-2xl font-bold text-tet-red mb-2">
                  Nhập Giftcode
                </h2>
                <p className="text-gray-600 mb-4 flex-grow">
                  Nhập mã giftcode để nhận phần thưởng
                </p>
                <Button variant="outline" className="w-full">
                  Nhập Giftcode
                </Button>
              </div>
            </Card>

            {/* Friends Card */}
            <Card
              className="hover:scale-105 transition-transform cursor-pointer h-full flex flex-col"
              onClick={() => setIsFriendsModalOpen(true)}
            >
              <div className="relative z-10 text-center flex flex-col h-full">
                <div className="text-6xl mb-4">👥</div>
                <h2 className="text-2xl font-bold text-tet-red mb-2">Bạn Bè</h2>
                <p className="text-gray-600 mb-4 flex-grow">
                  Quản lý danh sách bạn bè
                </p>
                <Button variant="outline" className="w-full">
                  Xem Bạn Bè
                </Button>
              </div>
            </Card>

            {/* Leaderboard Card */}
            <Card
              className="hover:scale-105 transition-transform cursor-pointer h-full flex flex-col"
              onClick={() => setIsLeaderboardModalOpen(true)}
            >
              <div className="relative z-10 text-center flex flex-col h-full">
                <div className="text-6xl mb-4">🏆</div>
                <h2 className="text-2xl font-bold text-tet-red mb-2">
                  Bảng Xếp Hạng
                </h2>
                <p className="text-gray-600 mb-4 flex-grow">
                  Xem thứ hạng của bạn
                </p>
                <Button variant="outline" className="w-full">
                  Xem Bảng Xếp Hạng
                </Button>
              </div>
            </Card>

            {/* Rules Card */}
            <Card
              className="hover:scale-105 transition-transform cursor-pointer h-full flex flex-col"
              onClick={() => setIsRulesModalOpen(true)}
            >
              <div className="relative z-10 text-center flex flex-col h-full">
                <div className="text-6xl mb-4">📖</div>
                <h2 className="text-2xl font-bold text-tet-red mb-2">
                  Luật Chơi
                </h2>
                <p className="text-gray-600 mb-4 flex-grow">
                  Tìm hiểu cách chơi Tiến Lên Miền Nam
                </p>
                <Button variant="outline" className="w-full">
                  Xem Luật Chơi
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Giftcode Modal */}
      <Modal
        isOpen={isGiftcodeModalOpen}
        onClose={() => {
          setIsGiftcodeModalOpen(false);
          setGiftcode("");
        }}
        title="Nhập Giftcode"
      >
        <div className="space-y-4">
          <Input
            label="Mã Giftcode"
            placeholder="Nhập mã giftcode của bạn"
            value={giftcode}
            onChange={(e) => setGiftcode(e.target.value.toUpperCase())}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleGiftcodeSubmit();
              }
            }}
          />
          <Button
            variant="primary"
            className="w-full"
            onClick={handleGiftcodeSubmit}
            isLoading={isSubmittingGiftcode}
          >
            Xác Nhận
          </Button>
          <p className="text-xs text-center text-gray-500">
            Mã giftcode có thể được nhận từ các sự kiện hoặc quà tặng đặc biệt
          </p>
        </div>
      </Modal>

      {/* Game Rules Modal */}
      <Modal
        isOpen={isRulesModalOpen}
        onClose={() => setIsRulesModalOpen(false)}
        title="Luật Chơi Tiến Lên Miền Nam"
        maxWidth="xl"
      >
        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-bold text-tet-red mb-3 flex items-center gap-2">
                <span>1. Giới Thiệu</span>
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Tiến Lên Miền Nam là một trò chơi bài dân gian phổ biến ở Việt
                Nam, được chơi với bộ bài 52 lá. Mục tiêu là đánh hết bài trên
                tay trước các đối thủ.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-tet-red mb-3 flex items-center gap-2">
                <span>2. Thứ Tự Quân Bài</span>
              </h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                Thứ tự từ nhỏ đến lớn:{" "}
                <strong>3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A, 2</strong>
              </p>
              <p className="text-gray-700 leading-relaxed">
                Quân 2 (heo) là quân bài lớn nhất. Trong cùng một giá trị, thứ
                tự chất là:
                <strong> Bích ♠, Chuồn ♣, Rô ♦, Cơ ♥</strong>
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-tet-red mb-3 flex items-center gap-2">
                <span>3. Các Tổ Hợp Bài</span>
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  <strong>Rác:</strong> Một quân bài đơn lẻ
                </li>
                <li>
                  <strong>Đôi:</strong> Hai quân bài cùng giá trị
                </li>
                <li>
                  <strong>Ba:</strong> Ba quân bài cùng giá trị
                </li>
                <li>
                  <strong>Tứ quý:</strong> Bốn quân bài cùng giá trị
                </li>
                <li>
                  <strong>Sảnh:</strong> Ba quân bài liên tiếp trở lên (tối
                  thiểu 3 lá)
                </li>
                <li>
                  <strong>Đôi thông:</strong> Ba đôi trở lên liên tiếp
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-tet-red mb-3 flex items-center gap-2">
                <span>4. Luật Chơi</span>
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Người chơi đầu tiên có thể đánh bất kỳ tổ hợp nào</li>
                <li>Người tiếp theo phải đánh tổ hợp lớn hơn hoặc bỏ lượt</li>
                <li>Nếu tất cả bỏ lượt, người vừa đánh được quyền đánh tiếp</li>
                <li>Người đánh hết bài trước sẽ thắng ván</li>
                <li>Tứ quý có thể chặn được heo (quân 2)</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-tet-red mb-3 flex items-center gap-2">
                <span>5. Lưu Ý</span>
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Ván đầu tiên, người có quân 3 Bích sẽ được đánh trước. Các ván
                sau, người thắng ván trước sẽ đánh đầu tiên.
              </p>
            </section>
          </div>
        </div>
      </Modal>

      {/* Friends Modal */}
      <Modal
        isOpen={isFriendsModalOpen}
        onClose={() => setIsFriendsModalOpen(false)}
        title="Danh Sách Bạn Bè"
        maxWidth="xl"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">
                Tổng số: <strong>{friends.length}</strong> bạn bè
              </span>
            </div>
            <Button variant="outline" className="text-sm px-4 py-2">
              Thêm Bạn
            </Button>
          </div>

          <div className="space-y-3 max-h-[60vh] overflow-y-auto">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-yellow-50 rounded-lg border border-tet-gold/30 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-tet-red to-tet-dark-red flex items-center justify-center text-white text-xl">
                      {friend.avatar}
                    </div>
                    <div
                      className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                        friend.status === "online"
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-tet-dark-red">
                      {friend.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Cấp độ: {friend.level}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="text-xs px-3 py-1">
                    Mời chơi
                  </Button>
                  <Button
                    variant="outline"
                    className="text-xs px-3 py-1 text-red-600 border-red-300 hover:bg-red-50"
                  >
                    Xóa
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {friends.length === 0 && (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">👥</div>
              <p className="text-gray-600 mb-4">Bạn chưa có bạn bè nào</p>
              <Button variant="primary">Thêm Bạn Bè</Button>
            </div>
          )}
        </div>
      </Modal>

      {/* Leaderboard Modal */}
      <Modal
        isOpen={isLeaderboardModalOpen}
        onClose={() => setIsLeaderboardModalOpen(false)}
        title="Bảng Xếp Hạng"
        maxWidth="2xl"
      >
        <div className="space-y-4">
          <div className="space-y-3 max-h-[60vh] overflow-y-auto">
            {leaderboard.map((player) => (
              <div
                key={player.rank}
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                  player.rank <= 3
                    ? "bg-gradient-to-r from-yellow-50 to-tet-gold/20 border-tet-gold"
                    : "bg-gradient-to-r from-red-50 to-yellow-50 border-tet-gold/30"
                } ${
                  player.name === "Nguyễn Hữu Lộc"
                    ? "ring-2 ring-tet-red ring-offset-2"
                    : ""
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg">
                    {player.rank === 1 ? (
                      <span className="text-3xl">🥇</span>
                    ) : player.rank === 2 ? (
                      <span className="text-3xl">🥈</span>
                    ) : player.rank === 3 ? (
                      <span className="text-3xl">🥉</span>
                    ) : (
                      <span className="text-tet-dark-red text-lg">
                        #{player.rank}
                      </span>
                    )}
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-tet-red to-tet-dark-red flex items-center justify-center text-white text-xl">
                    {player.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-tet-dark-red flex items-center gap-2">
                      {player.name}
                      {player.name === "Nguyễn Hữu Lộc" && (
                        <span className="text-xs bg-tet-red text-white px-2 py-1 rounded">
                          Bạn
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-600">Cấp {player.level}</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-tet-red">
                    {player.wins.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">trận thắng</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-tet-gold/10 rounded-lg border border-tet-gold/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Thứ hạng của bạn</p>
                <p className="text-2xl font-bold text-tet-red">
                  #{currentUserRank}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Số trận thắng</p>
                <p className="text-2xl font-bold text-tet-red">
                  {currentUserData.wins.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
