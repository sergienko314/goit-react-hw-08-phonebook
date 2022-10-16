import image from '../../images/phonebook.jpeg'
import s from './HomePage.module.css';

const HomePage = () => {
    return (
        <main className={s.wrapper}>
            <h1 className={s.text}>Phonebook </h1>
            <div>
                <img className={s.img}
                    src={image}
                    alt='Phone and phonebook'
                />
            </div>
        </main>
    );
};

export default HomePage;
