import { FC } from 'react';
import classnames from 'classnames';

import { Props } from './types';

import styles from './Icons.module.css';

export const Copy: FC<Props> = ({ className }) => {
  const rootClassName = classnames(styles.root, className);
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={rootClassName}
    >
      <g opacity="0.72" clipPath="url(#clip0_7287_61294)">
        <path
          d="M4.88281 17.1812C4.88281 18.7632 5.6958 19.5835 7.26318 19.5835H14.1187C15.686 19.5835 16.4917 18.7559 16.4917 17.1812V15.8262H17.7368C19.3042 15.8262 20.1172 15.0059 20.1172 13.4238V7.62305C20.1172 6.66357 19.9194 6.04834 19.3408 5.45508L15.686 1.73438C15.1367 1.17041 14.4849 0.958008 13.6426 0.958008H10.8813C9.32129 0.958008 8.50098 1.77832 8.50098 3.36035V4.70801H7.26318C5.6958 4.70801 4.88281 5.53564 4.88281 7.11035V17.1812ZM15.7593 9.4834L11.7896 5.44775C11.2256 4.87646 10.7495 4.72266 9.93652 4.71533V3.44092C9.93652 2.76709 10.2954 2.39355 11.0059 2.39355H14.0674V5.89453C14.0674 6.80273 14.5508 7.27148 15.4517 7.27148H18.6816V13.3359C18.6816 14.0171 18.3301 14.3906 17.6123 14.3906H16.4917V11.5488C16.4917 10.5601 16.3745 10.106 15.7593 9.4834ZM15.2686 5.71143V2.98682L18.3081 6.07031H15.6274C15.3784 6.07031 15.2686 5.96777 15.2686 5.71143ZM6.31836 17.0933V7.19824C6.31836 6.52441 6.66992 6.14355 7.38037 6.14355H9.62891V10.1572C9.62891 11.2046 10.1489 11.7173 11.189 11.7173H15.0562V17.0933C15.0562 17.7744 14.7046 18.1479 13.9941 18.1479H7.38037C6.66992 18.1479 6.31836 17.7744 6.31836 17.0933ZM11.3281 10.4502C11.0278 10.4502 10.896 10.3184 10.896 10.0181V6.42188L14.8584 10.4502H11.3281Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_7287_61294">
          <rect width="20" height="20" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
};
