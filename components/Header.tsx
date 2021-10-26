import classNames from 'classnames';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { SunIcon } from '@heroicons/react/solid';
import { MoonIcon } from '@heroicons/react/solid';
import BLOG from '~/blog.config';
import { fetchLocaleLang } from '~/lib/i18n/lang';
import { Twemoji } from './Twemoji';

const locale = fetchLocaleLang();
const links = [
  { id: 0, name: locale.NAV.INDEX, to: BLOG.path || '/', show: true },
  { id: 1, name: locale.NAV.ABOUT, to: '/about', show: BLOG.showAbout },
  { id: 2, name: locale.NAV.RSS, to: '/feed', show: true },
];

const NavBar: React.VFC = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const activeNav = useMemo(() => {
    if (router.asPath === links[1].to) return links[1].to;
    if (router.pathname === links[0].to || router.asPath.includes('tag')) return links[0].to;
    return null;
  }, [router]);

  return (
    <div className="flex-shrink-0">
      <ul className="flex flex-row items-center">
        {links.map(
          (link) =>
            link.show && (
              <li
                key={link.id}
                className={classNames('block ml-4 text-black dark:text-gray-50 nav', {
                  'border-b-2 border-blue-700 dark:border-blue-400': link.to === activeNav,
                })}
              >
                <Link href={link.to}>
                  <a>{link.name}</a>
                </Link>
              </li>
            ),
        )}
        <li className="ml-4">
          <button
            className="block p-1 bg-night dark:bg-day rounded-full transition-all duration-300"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label="toggle Dark Mode"
          >
            {theme === 'light' ? <MoonIcon className="w-5 h-5 text-day" /> : <SunIcon className="w-5 h-5 text-night" />}
          </button>
        </li>
      </ul>
    </div>
  );
};

type HeaderProps = {
  navBarTitle: string | null;
  fullWidth?: boolean;
};

export const Header: React.VFC<HeaderProps> = ({ navBarTitle, fullWidth }) => {
  const navRef = useRef<HTMLDivElement>(null);
  const sentinalRef = useRef<HTMLDivElement>(null);
  const handler = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (navRef && navRef.current && !BLOG.autoCollapsedNavBar) {
      if (!entry.isIntersecting && entry !== undefined) {
        navRef.current.classList.add('sticky-nav-full');
      } else {
        navRef.current.classList.remove('sticky-nav-full');
      }
    } else {
      navRef?.current?.classList.add('remove-sticky');
    }
  }, []);
  useEffect(() => {
    const obvserver = new window.IntersectionObserver(handler);
    if (sentinalRef?.current) obvserver.observe(sentinalRef.current);
    // Don't touch this, I have no idea how it works XD
    // return () => {
    //   if (sentinalRef.current) obvserver.unobserve(sentinalRef.current);
    // };
  }, [sentinalRef, handler]);
  return (
    <>
      <div className="h-4 md:h-12" ref={sentinalRef}></div>
      <div
        className={classNames(
          'sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60',
          {
            'px-4 md:px-24': fullWidth,
            'max-w-2xl px-4': !fullWidth,
          },
        )}
        id="sticky-nav"
        ref={navRef}
      >
        <div className="flex items-center">
          <Link href="/">
            <a aria-label={BLOG.title}>
<<<<<<< HEAD
              <div className="h-6">
              <svg id="fi_2809425" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="m20.832.542h-17.664c-1.448 0-2.626 1.178-2.626 2.626v17.664c0 1.448 1.178 2.626 2.626 2.626h17.664c1.448 0 2.626-1.178 2.626-2.626v-17.664c0-1.448-1.178-2.626-2.626-2.626z" fill="#607d8b"></path><path d="m4.75 18c-.192 0-.384-.073-.53-.22-.293-.293-.293-.768 0-1.061l4.719-4.719-4.719-4.72c-.293-.293-.293-.768 0-1.061s.768-.293 1.061 0l5.25 5.25c.293.293.293.768 0 1.061l-5.25 5.25c-.147.147-.339.22-.531.22z"></path><path d="m21.25 24h-18.5c-1.517 0-2.75-1.233-2.75-2.75v-18.5c0-1.517 1.233-2.75 2.75-2.75h18.5c1.517 0 2.75 1.233 2.75 2.75v18.5c0 1.517-1.233 2.75-2.75 2.75zm-18.5-22.5c-.689 0-1.25.561-1.25 1.25v18.5c0 .689.561 1.25 1.25 1.25h18.5c.689 0 1.25-.561 1.25-1.25v-18.5c0-.689-.561-1.25-1.25-1.25z"></path><path d="m19.25 18h-6.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h6.5c.414 0 .75.336.75.75s-.336.75-.75.75z"></path>
              </svg>
=======
              <div className="min-w-max">
                <Twemoji emoji={'🛸'} size={28} />
>>>>>>> 7d04f506c1962237fb36acc99af35f98bce57825
              </div>
            </a>
          </Link>
          {navBarTitle ? (
            <p className="ml-2 font-medium text-day dark:text-night header-name">{navBarTitle}</p>
          ) : (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {BLOG.title} -<span className="font-normal">{BLOG.description}</span>
            </p>
          )}
        </div>
        <NavBar />
      </div>
    </>
  );
};
