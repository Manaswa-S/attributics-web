const variants = {
    default: 'bg-gray-100 text-gray-700',
    primary: 'bg-blue-100 text-blue-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-amber-100 text-amber-700',
    gradient: 'bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700',
};

const Badge = ({
    children,
    variant = 'default',
    className = '',
    ...props
}) => {
    return (
        <span
            className={`
        inline-flex items-center gap-1.5
        px-3 py-1 rounded-full
        text-sm font-medium
        ${variants[variant]}
        ${className}
      `}
            {...props}
        >
            {children}
        </span>
    );
};

export default Badge;
