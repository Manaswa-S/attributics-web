const Container = ({
    children,
    className = '',
    size = 'default',
    ...props
}) => {
    const sizeClasses = {
        sm: 'max-w-3xl',
        default: 'max-w-7xl',
        lg: 'max-w-[1400px]',
        full: 'max-w-full',
    };

    return (
        <div
            className={`
        w-full mx-auto px-4 sm:px-6 lg:px-8
        ${sizeClasses[size]}
        ${className}
      `}
            {...props}
        >
            {children}
        </div>
    );
};

export default Container;
