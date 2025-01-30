import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { FaHeart, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { translations } from './translations';


const BookRow = ({ book, index }) => {
    const [isOpen, setIsOpen] = useState(false);
    const currentLanguage = useSelector((state) => state.region.region);
    const t = translations[currentLanguage];

    return (
        <>
            <tr onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>
                <th scope="row">{index + 1}</th>
                <td>{book.isbn}</td>
                <td>{book.titulo}</td>
                <td>{book.autor}</td>
                <td>{book.editorial}</td>
                <td>
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </td>
            </tr>

            {isOpen && (
                <tr>
                    <td colSpan="6">
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="p-3 bg-light rounded"
                        >
                            <div className="d-flex gap-3">
                                <div>
                                    <img
                                        src={book.imagen}
                                        alt={`Cover of ${book.titulo}`}
                                        className="img-fluid rounded"
                                        style={{ width: "150px" }}
                                    />
                                    <p className="mt-2">
                                        {book.likes} <FaHeart className="text-danger" />
                                    </p>
                                </div>

                                <div className="flex-grow-1 text-left">
                                    <h5 className="mb-3">{book.titulo}</h5>
                                    <p className="mb-3"><strong>{t.by}</strong> {book.autor}</p>
                                    <p className="mb-3"><strong>{t.reviews}</strong></p>

                                    {Array.isArray(book.reviews) && book.reviews.length > 0 ? (
                                        book.reviews.map((rev, idx) => (
                                            <div key={idx} className="mb-3">
                                                <p className="fst-italic mb-1">"{rev.review}"</p>
                                                <p className="fw-bold">— {rev.name}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>{t.noReviewsAvailable}</p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </td>
                </tr>
            )}
        </>
    );
};

export default BookRow;