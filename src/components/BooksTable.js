import { Faker, fr, en, de } from "@faker-js/faker";
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import BookRow from "./BookRow";
import { translations } from './translations';


const BooksTable = () => {
    const region = useSelector((state) => state.region.region);
    const currentSeed = useSelector((state) => state.seed.seed);
    const likes = useSelector((state) => state.likes.likes);
    const reviews = useSelector((state) => state.reviews.reviews);
    const [visibleBooks, setVisibleBooks] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    const [page, setPage] = useState(1);
    const booksPerPage = 20;
    const newFaker = createFaker(region);




    useEffect(() => {
        const newBooks = generateBook();
        setAllBooks(newBooks);
        setVisibleBooks(newBooks.slice(0, booksPerPage));
        setPage(1);
    }, [region, currentSeed]);

    useEffect(() => {
        if (allBooks.length > 0) {
            const updatedBooks = allBooks.map(book => ({
                ...book,
                likes: generateLikes(),
                reviewsCount: generateReviewsCount(),
                reviews: generateReviews(generateReviewsCount())
            }));
            setAllBooks(updatedBooks);
            setVisibleBooks(updatedBooks.slice(0, page * booksPerPage));
        }
    }, [likes, reviews]);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight - 10) {
                loadMoreBooks();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [page, allBooks]);

    const loadMoreBooks = () => {
        const nextPage = page + 1;
        const startIndex = (nextPage - 1) * booksPerPage;
        const endIndex = startIndex + booksPerPage;

        const newBooks = allBooks.slice(startIndex, endIndex);

        if (newBooks.length > 0) {
            setVisibleBooks((prevBooks) => [...prevBooks, ...newBooks]);
            setPage(nextPage);
        }
    };

    function createFaker(region) {
        const locales = {
            fr: fr,
            en: en,
            de: de,
        };

        const locale = locales[region] || en;
        const faker = new Faker({ locale: [locale] });
        return faker
    }

    function generateLikes() {
        const integerPart = Math.floor(likes);
        const decimalPart = likes - integerPart;
        const bookLikes = Math.random() < decimalPart ? integerPart + 1 : integerPart;
        return bookLikes
    }

    function generateReviewsCount() {
        const integerPartReviews = Math.floor(reviews);
        const decimalPartReviews = reviews - integerPartReviews;
        const bookReviews = Math.random() < decimalPartReviews ? integerPartReviews + 1 : integerPartReviews;
        return bookReviews
    }

    function generateReviews(count) {
        const newFaker = createFaker(region);
        newFaker.seed(currentSeed)
        const reviews = [];
        for (let j = 0; j < count; j++) {
            reviews.push({
                name: newFaker.person.fullName(),
                review: newFaker.lorem.paragraph(),
            });
        }
        return reviews;
    }

    function generateBook() {
        newFaker.seed(currentSeed)

        const libros = [];
        const bunch = 100;

        for (let i = 0; i < bunch; i++) {
            let reviewsCount = generateReviewsCount()
            let bookLikes = generateLikes()
            const bookReviews = generateReviews(reviewsCount);
            libros.push({
                id: newFaker.string.uuid(),
                titulo: newFaker.lorem.sentence(3),
                autor: newFaker.person.fullName(),
                editorial: newFaker.company.name(),
                año: newFaker.number.int({ min: 1900, max: 2023 }),
                descripcion: newFaker.lorem.paragraphs(5),
                isbn: newFaker.commerce.isbn(),
                imagen: newFaker.image.urlLoremFlickr({ width: 300, height: 400 }),
                likes: bookLikes,
                reviews: bookReviews,
                reviewsCount: reviewsCount
            });
        }

        return libros;
    }

    const t = translations[region];

    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">{t.tableHeaders.number}</th>
                        <th scope="col">{t.tableHeaders.isbn}</th>
                        <th scope="col">{t.tableHeaders.title}</th>
                        <th scope="col">{t.tableHeaders.authors}</th>
                        <th scope="col">{t.tableHeaders.publisher}</th>
                    </tr>
                </thead>
                <tbody>
                    {visibleBooks.map((book, index) => (
                        <BookRow key={book.id} book={book} index={index} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BooksTable;