const Card = ({
    children,
    className = '',
    hover = true,
    padding = 'md',
    ...props
}) => {
    const paddingClasses = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    return (
        <div
            className={`
        bg-white rounded-2xl border border-gray-100
        ${hover ? 'hover-lift' : ''}
        ${paddingClasses[padding]}
        ${className}
      `}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
