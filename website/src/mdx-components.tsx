import type { MDXComponents } from 'mdx/types';

const components = {
    a: ({ children, href }) => (
        <a className='font-reddit-sans' href={href}>{children}</a>
    ),
    h1: ({ children }) => (
        <h1 className='font-sora text-2xl md:text-3xl mb-[0.888889em]'>{children}</h1>
    ),
    h2: ({ children }) => (
        <h2 className='font-sora text-xl md:text-2xl mt-[2em] mb-[1em]'>{children}</h2>
    ),
    h3: ({ children }) => (
        <h3 className='font-sora text-lg md:text-xl mt-[1.6em] mb-[0.6em]'>{children}</h3>
    ),
    h4: ({ children }) => (
        <h4 className='font-sora'>{children}</h4>
    ),
    h5: ({ children }) => (
        <h5 className='font-sora'>{children}</h5>
    ),
    h6: ({ children }) => (
        <h6 className='font-reddit-sans text-[13px] text-white/50 mb-[1em] mt-[1em]'>{children}</h6>
    ),
    li: ({ children }) => (
        <li className='font-reddit-sans mt-[1.1em] mb-[1.1em] in-[ul]:relative in-[ul]:before:mr-2 in-[ul]:before:content-["-"] in-[ul]:before:absolute in-[ul]:before:-ml-4 in-[ul]:pl-4'>{children}</li>
    ),
    p: ({ children }) => (
        <p className='font-reddit-sans leading-7 mt-[1.25em] mb-[1.25em]'>{children}</p>
    ),
    ul: ({ children }) => (
        <ul className='font-reddit-sans'>{children}</ul>
    )
} satisfies MDXComponents;

export function useMDXComponents() {
    return components;
}
