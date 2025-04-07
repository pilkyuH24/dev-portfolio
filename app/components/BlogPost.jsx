//BlogPost.jsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
import TableOfContents from './TableOfContents';
import CodeMirrorEditor from '../components/CodeMirrorEditor';
import Image from 'next/image';
import Markdown from 'react-markdown';

const BlogPost = ({
    title,
    content,
    className = '',
    isSingleContent = true
}) => {
    const contentRefs = useRef([]);
    const [activeSection, setActiveSection] = useState({ contentIndex: 0, sectionIndex: 0 });

    useEffect(() => {
        if (isSingleContent) {
            contentRefs.current = Array(content.length).fill().map(() => React.createRef());
        } else {
            contentRefs.current = content.map(item =>
                Array(item.content.length).fill().map(() => React.createRef())
            );
        }
    }, [content, isSingleContent]);

    const handleSectionClick = (contentIndex, sectionIndex) => {
        let targetRef;
        if (isSingleContent) {
            targetRef = contentRefs.current[sectionIndex]?.current;
        } else {
            targetRef = contentRefs.current[contentIndex]?.[sectionIndex]?.current;
        }

        if (targetRef) {
            targetRef.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            setActiveSection({ contentIndex, sectionIndex });
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (isSingleContent) {
                            const index = contentRefs.current.findIndex(
                                ref => ref?.current === entry.target
                            );
                            if (index !== -1) {
                                setActiveSection({ contentIndex: 0, sectionIndex: index });
                            }
                        } else {
                            for (let contentIndex = 0; contentIndex < content.length; contentIndex++) {
                                const sectionIndex = contentRefs.current[contentIndex].findIndex(
                                    ref => ref?.current === entry.target
                                );
                                if (sectionIndex !== -1) {
                                    setActiveSection({ contentIndex, sectionIndex });
                                    break;
                                }
                            }
                        }
                    }
                });
            },
            { threshold: 0.5, rootMargin: '0px 0px -50% 0px' }
        );

        if (isSingleContent) {
            contentRefs.current.forEach(ref => {
                if (ref?.current) observer.observe(ref.current);
            });
        } else {
            contentRefs.current.forEach(contentRefs => {
                contentRefs.forEach(ref => {
                    if (ref?.current) observer.observe(ref.current);
                });
            });
        }

        return () => observer.disconnect();
    }, [content, isSingleContent]);

    const renderContent = (contentData, contentIndex = 0) => {
        return contentData.map((section, sectionIndex) => {
            const getRef = () => {
                if (isSingleContent) {
                    return contentRefs.current[sectionIndex];
                } else {
                    return contentRefs.current[contentIndex]?.[sectionIndex];
                }
            };

            return (
                <div
                    key={`section-${contentIndex}-${sectionIndex}`}
                    ref={getRef()}
                    className="blog-section mb-12"
                    id={`section-${contentIndex}-${sectionIndex}`}
                >
                    <h2 className="text-2xl font-bold mb-4 font-gowun">
                        <Markdown>
                            {section.header}
                        </Markdown>
                    </h2>

                    {section.image && (
                        <div className="my-6 relative w-2/3 aspect-video rounded-lg overflow-hidden">
                            <Image
                                src={section.image.src}
                                alt={section.image.alt || ''}
                                fill
                                className="object-cover"
                                sizes="(max-width: 600px) 100vw, 50vw"
                                priority
                            />
                        </div>
                    )}

                    <div className="text-lg text-gray-900 dark:text-gray-200 font-gowun mb-6">
                        <Markdown>
                            {section.body}
                        </Markdown>
                    </div>

                    {section.code && (
                        <div className="my-6">
                            <CodeMirrorEditor code={section.code} />
                        </div>
                    )}
                </div>
            );
        });
    };

    return (
        <div className='flex flex-cols-2'>
            <div className='max-w-fit'>
                <TableOfContents
                    title={title}
                    sections={isSingleContent
                        ? [{ title, content }]
                        : content.map(c => ({ title: c.title, content: c.content }))}
                    activeSection={activeSection}
                    onSectionClick={handleSectionClick}
                />
            </div>
            <div className={`blogContainer ${className}`}>
                <div className="blogBody">
                    {isSingleContent ? (
                        <>
                            <h1 className="text-4xl font-bold mb-8 font-gowun">{title}</h1>
                            {renderContent(content)}
                        </>
                    ) : (
                        content.map((contentItem, contentIndex) => (
                            <div key={`content-${contentIndex}`} className="mb-16">
                                <h1 className="text-4xl font-bold mt-36 mb-8 font-gowun">
                                    {contentItem.title}
                                </h1>
                                {renderContent(contentItem.content, contentIndex)}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
