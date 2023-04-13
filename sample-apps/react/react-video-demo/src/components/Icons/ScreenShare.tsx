import { FC } from 'react';
import classnames from 'classnames';

import { Props } from './types';

import styles from './Icons.module.css';

export const ScreenShare: FC<Props> = ({ className }) => {
  const rootClassName = classnames(styles.root, className);
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      className={rootClassName}
    >
      <mask id="path-1-inside-1_8426_197613" fill="currentColor">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.14844 6.83887C2.14844 5.7343 3.04387 4.83887 4.14844 4.83887H20.1484C21.253 4.83887 22.1484 5.7343 22.1484 6.83887V16.4752C22.1484 17.5798 21.253 18.4752 20.1484 18.4752H4.14844C3.04387 18.4752 2.14844 17.5798 2.14844 16.4752V6.83887ZM10.5694 11.6814L8.51194 11.6571L12.1483 7.41466L15.7847 11.6571L13.6549 11.6818V15.8995L10.5694 15.8995V11.6814Z"
        />
      </mask>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.14844 6.83887C2.14844 5.7343 3.04387 4.83887 4.14844 4.83887H20.1484C21.253 4.83887 22.1484 5.7343 22.1484 6.83887V16.4752C22.1484 17.5798 21.253 18.4752 20.1484 18.4752H4.14844C3.04387 18.4752 2.14844 17.5798 2.14844 16.4752V6.83887ZM10.5694 11.6814L8.51194 11.6571L12.1483 7.41466L15.7847 11.6571L13.6549 11.6818V15.8995L10.5694 15.8995V11.6814Z"
        fill="currentColor"
      />
      <path
        d="M8.51194 11.6571L6.99343 10.3555L4.20709 13.6062L8.48825 13.6569L8.51194 11.6571ZM10.5694 11.6814H12.5694V9.705L10.5931 9.68159L10.5694 11.6814ZM12.1483 7.41466L13.6668 6.11307L12.1483 4.34148L10.6298 6.11307L12.1483 7.41466ZM15.7847 11.6571L15.8079 13.6569L20.0904 13.6072L17.3032 10.3555L15.7847 11.6571ZM13.6549 11.6818L13.6317 9.68194L11.6549 9.70489V11.6818H13.6549ZM13.6549 15.8995L13.6549 17.8995L15.6549 17.8995V15.8995H13.6549ZM10.5694 15.8995H8.56938V17.8995L10.5694 17.8995L10.5694 15.8995ZM4.14844 2.83887C1.9393 2.83887 0.148438 4.62973 0.148438 6.83887H4.14844V6.83887V2.83887ZM20.1484 2.83887H4.14844V6.83887H20.1484V2.83887ZM24.1484 6.83887C24.1484 4.62973 22.3576 2.83887 20.1484 2.83887V6.83887H24.1484ZM24.1484 16.4752V6.83887H20.1484V16.4752H24.1484ZM20.1484 20.4752C22.3576 20.4752 24.1484 18.6844 24.1484 16.4752H20.1484V16.4752V20.4752ZM4.14844 20.4752H20.1484V16.4752H4.14844V20.4752ZM0.148438 16.4752C0.148438 18.6844 1.9393 20.4752 4.14844 20.4752V16.4752H4.14844H0.148438ZM0.148438 6.83887V16.4752H4.14844V6.83887H0.148438ZM8.48825 13.6569L10.5457 13.6813L10.5931 9.68159L8.53563 9.65722L8.48825 13.6569ZM10.6298 6.11307L6.99343 10.3555L10.0305 12.9587L13.6668 8.71624L10.6298 6.11307ZM17.3032 10.3555L13.6668 6.11307L10.6298 8.71624L14.2662 12.9587L17.3032 10.3555ZM13.6782 13.6817L15.8079 13.6569L15.7614 9.65721L13.6317 9.68194L13.6782 13.6817ZM11.6549 11.6818V15.8995H15.6549V11.6818H11.6549ZM13.6549 13.8995L10.5694 13.8995L10.5694 17.8995L13.6549 17.8995L13.6549 13.8995ZM12.5694 15.8995V11.6814H8.56938V15.8995H12.5694Z"
        fill="currentColor"
        mask="url(#path-1-inside-1_8426_197613)"
      />
    </svg>
  );
};
