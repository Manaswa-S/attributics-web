const Input = ({
    type = 'text',
    placeholder = '',
    className = '',
    icon,
    ...props
}) => {
    return (
        <div className="relative">
            {icon && (
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    {icon}
                </span>
            )}
            <input
                type={type}
                placeholder={placeholder}
                className={`
          w-full px-4 py-3 
          ${icon ? 'pl-12' : ''}
          bg-white border border-gray-200 rounded-full
          text-gray-900 placeholder:text-gray-400
          focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent
          transition-all duration-200
          ${className}
        `}
                {...props}
            />
        </div>
    );
};

export default Input;
