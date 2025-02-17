interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card = ({ children, className = "", ...props }: CardProps) => {
  return (
    <div className={`rounded-lg shadow-md ${className}`} {...props}>
      {children}
    </div>
  );
}; 