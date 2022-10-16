import { ThreeDots } from 'react-loader-spinner';
import s from './Loader.module.css';

export default function Loader() {
    return (
        <div className={s.wrapper}>
            <ThreeDots color="green" />
        </div>
    );
};
