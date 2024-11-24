import { Link } from "react-router-dom";

interface ButtonProps {
  btnText: string;
  className: string;
  scrollToView: boolean;
  href?: string;
  icon?: React.JSX.Element;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  btnText,
  className,
  href,
  scrollToView,
  onClick,
  icon,
}) => {
  if (href && scrollToView) {
    return (
      <Link to={href} className={className} onClick={onClick}>
        {btnText}
      </Link>
    );
  }
  if (href) {
    return (
      <Link to={href} className={className}>
        {btnText}
      </Link>
    );
  }

  return (
    <button className={className}>
      {btnText}
      {icon && (
        <span
          className="mb-0.5
        "
        >
          {icon}
        </span>
      )}
    </button>
  );
};

export default Button;
