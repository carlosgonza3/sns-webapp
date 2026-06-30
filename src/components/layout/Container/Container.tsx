import type {
    ComponentPropsWithoutRef,
    ElementType,
    ReactNode,
} from 'react';

import styles from './Container.module.scss';

type ContainerProps<TElement extends ElementType = 'div'> = {
    as?: TElement;
    children: ReactNode;
    className?: string;
} & Omit<
    ComponentPropsWithoutRef<TElement>,
    'as' | 'children' | 'className'
>;

export function Container<TElement extends ElementType = 'div'>({
                                                                    as,
                                                                    children,
                                                                    className = '',
                                                                    ...rest
                                                                }: ContainerProps<TElement>) {
    const Component = as ?? 'div';

    return (
        <Component
            className={`${styles.container} ${className}`.trim()}
            {...rest}
        >
            {children}
        </Component>
    );
}