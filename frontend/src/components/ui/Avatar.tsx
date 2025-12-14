import { useState, useRef, useEffect } from "react";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { colorPalette } from "@/constants/colorPalette";
import "./Avatar.scss";

interface AvatarProps {
  email?: string;
  size?: number;
}

export const Avatar = ({ email, size = 32 }: AvatarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const displayEmail = email || user?.email || "";
  const firstLetter = displayEmail.charAt(0).toUpperCase();

  // Funkcja do generowania koloru na podstawie emaila
  const getAvatarColor = (email: string): string => {
    const colors = [
      "#FF6B6B", // Czerwony
      "#4ECDC4", // Turkusowy
      "#45B7D1", // Niebieski
      "#96CEB4", // Zielony
      "#FFEAA7", // Żółty
      "#DFE6E9", // Szary
      "#74B9FF", // Jasnoniebieski
      "#A29BFE", // Fioletowy
      "#FD79A8", // Różowy
      "#FDCB6E", // Pomarańczowy
    ];

    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  const avatarColor = getAvatarColor(displayEmail);

  // Zamykanie dropdown przy kliknięciu poza nim
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

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    await logout();
  };

  return (
    <div className="avatar-container" ref={dropdownRef}>
      <button
        className="avatar-button"
        onClick={handleAvatarClick}
        style={{
          width: size,
          height: size,
          backgroundColor: avatarColor,
        }}
        aria-label="User menu"
      >
        <span className="avatar-letter">{firstLetter}</span>
      </button>

      {isDropdownOpen && (
        <div className="avatar-dropdown">
          <div className="dropdown-header">
            <div className="dropdown-email">{displayEmail}</div>
            {user?.role && (
              <div className="dropdown-role">{user.role.toLowerCase()}</div>
            )}
          </div>

          <div className="dropdown-divider" />

          <button className="dropdown-item" onClick={handleLogout}>
            <LogOut size={16} />
            <span>Wyloguj się</span>
          </button>
        </div>
      )}
    </div>
  );
};
