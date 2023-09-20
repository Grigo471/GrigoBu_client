import { MutableRefObject, useEffect } from 'react';

export interface useInfiniteScrollOptions {
    callback?: () => void;
    triggerRef: MutableRefObject<Element>;
    wrapperRef: MutableRefObject<Element>;
}

export function useInfiniteScroll({ callback, triggerRef, wrapperRef }: useInfiniteScrollOptions) {
    useEffect(() => {
        let observer: IntersectionObserver | null = null;
        if (callback) {
            const options = {
                root: wrapperRef.current,
                rootMargin: '20px 20px 20px 45px',
                treshold: 1.0,
            };

            observer = new IntersectionObserver(([enrty]) => {
                if (enrty.isIntersecting) {
                    callback();
                }
            }, options);

            observer.observe(triggerRef.current);
        }

        return () => {
            if (observer && triggerRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(triggerRef.current);
            }
        };
    }, [triggerRef, wrapperRef, callback]);
}
