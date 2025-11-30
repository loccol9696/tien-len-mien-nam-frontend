import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Button from '../components/Button'
import Card from '../components/Card'

const Home: React.FC = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-6xl opacity-20 lantern">🏮</div>
      <div className="absolute top-20 right-20 text-5xl opacity-20 lantern" style={{ animationDelay: '1s' }}>🎋</div>
      <div className="absolute bottom-20 left-20 text-5xl opacity-20 lantern" style={{ animationDelay: '0.5s' }}>🧧</div>
      <div className="absolute bottom-10 right-10 text-6xl opacity-20 lantern" style={{ animationDelay: '1.5s' }}>🧧</div>
      <div className="absolute top-1/2 left-1/4 text-5xl opacity-20 lantern" style={{ animationDelay: '0.3s' }}>🎴</div>
      <div className="absolute top-1/3 right-1/4 text-5xl opacity-20 lantern" style={{ animationDelay: '0.7s' }}>🎴</div>

      <div className="max-w-6xl mx-auto pt-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-bold text-tet-red mb-2">
              🎴 Tiến Lên Miền Nam
            </h1>
            <p className="text-tet-dark-red text-xl">Chúc Mừng Năm Mới! 🎉</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Đăng Xuất
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Game Room Card */}
          <Card className="hover:scale-105 transition-transform cursor-pointer">
            <div className="text-center">
              <div className="text-6xl mb-4">🎮</div>
              <h2 className="text-2xl font-bold text-tet-red mb-2">Tạo Phòng</h2>
              <p className="text-gray-600 mb-4">Tạo phòng chơi mới và mời bạn bè</p>
              <Button variant="primary" className="w-full">
                Tạo Phòng
              </Button>
            </div>
          </Card>

          {/* Join Room Card */}
          <Card className="hover:scale-105 transition-transform cursor-pointer">
            <div className="text-center">
              <div className="text-6xl mb-4">🚪</div>
              <h2 className="text-2xl font-bold text-tet-red mb-2">Tham Gia Phòng</h2>
              <p className="text-gray-600 mb-4">Tham gia phòng chơi với mã phòng</p>
              <Button variant="secondary" className="w-full">
                Tham Gia
              </Button>
            </div>
          </Card>

          {/* Leaderboard Card */}
          <Card className="hover:scale-105 transition-transform cursor-pointer">
            <div className="text-center">
              <div className="text-6xl mb-4">🏆</div>
              <h2 className="text-2xl font-bold text-tet-red mb-2">Bảng Xếp Hạng</h2>
              <p className="text-gray-600 mb-4">Xem thứ hạng của bạn</p>
              <Button variant="outline" className="w-full">
                Xem Bảng Xếp Hạng
              </Button>
            </div>
          </Card>

          {/* Profile Card */}
          <Card className="hover:scale-105 transition-transform cursor-pointer">
            <div className="text-center">
              <div className="text-6xl mb-4">👤</div>
              <h2 className="text-2xl font-bold text-tet-red mb-2">Hồ Sơ</h2>
              <p className="text-gray-600 mb-4">Xem và chỉnh sửa thông tin cá nhân</p>
              <Button variant="outline" className="w-full">
                Xem Hồ Sơ
              </Button>
            </div>
          </Card>

          {/* Rules Card */}
          <Card className="hover:scale-105 transition-transform cursor-pointer">
            <div className="text-center">
              <div className="text-6xl mb-4">📖</div>
              <h2 className="text-2xl font-bold text-tet-red mb-2">Luật Chơi</h2>
              <p className="text-gray-600 mb-4">Tìm hiểu cách chơi Tiến Lên Miền Nam</p>
              <Button variant="outline" className="w-full">
                Xem Luật Chơi
              </Button>
            </div>
          </Card>

          {/* History Card */}
          <Card className="hover:scale-105 transition-transform cursor-pointer">
            <div className="text-center">
              <div className="text-6xl mb-4">📜</div>
              <h2 className="text-2xl font-bold text-tet-red mb-2">Lịch Sử</h2>
              <p className="text-gray-600 mb-4">Xem lịch sử các ván đã chơi</p>
              <Button variant="outline" className="w-full">
                Xem Lịch Sử
              </Button>
            </div>
          </Card>
        </div>

        {/* Tet Greeting */}
        <Card className="mt-8 text-center">
          <div className="text-4xl mb-4">🎊</div>
          <h2 className="text-3xl font-bold text-tet-red mb-2">
            Chúc Mừng Năm Mới!
          </h2>
          <p className="text-lg text-gray-700">
            Chúc bạn và gia đình một năm mới an khang thịnh vượng, vạn sự như ý! 🎉
          </p>
          <p className="text-lg text-gray-700 mt-2">
            Chúc bạn chơi game vui vẻ và may mắn! 🍀
          </p>
        </Card>
      </div>
    </div>
  )
}

export default Home

