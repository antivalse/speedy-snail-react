import { Link } from "react-router-dom";

interface ButtonProps {
  btnText: string;
  className: string;
  hasLink: boolean;
  href?: string;
  icon?: React.JSX.Element;
}

const Button: React.FC<ButtonProps> = ({
  btnText,
  className,
  href,
  hasLink,
  icon,
}) => {
  if (hasLink && href) {
    return (
      <Link to={href} className={className}>
        {btnText}
      </Link>
    );
  } else
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
