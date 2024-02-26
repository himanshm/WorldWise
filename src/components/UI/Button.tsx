import { type ReactNode, ComponentPropsWithoutRef } from 'react';
import styles from './Button.module.css';

// interface ButtonProps {
//   onClick: React.MouseEventHandler<HTMLButtonElement>;
//   // Other props if any
// }

type ButtonProps = {
  children: ReactNode;
  btntype: string;
} & ComponentPropsWithoutRef<'button'>;
function Button({ children, btntype, ...props }: ButtonProps) {
  return (
    <button {...props} className={`${styles.btn} ${styles[btntype]}`}>
      {children}
    </button>
  );
}

export default Button;
