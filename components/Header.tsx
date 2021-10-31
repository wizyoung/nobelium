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
              <div className="min-w-max">
                <svg id="fi_2809425" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <image id="image0" width="24" height="24" x="0" y="0"
    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABJlBMVEUex/onyPkuyfgsyfmN
2O/m5ubQ4+iJ1Ovf39/K3OKJ1Ore3t7J2+Fx0e6b1ujA2uLg4ODj4+Pc4uSg2+2e1ufi4uLl5eXv
7+/s7Ozu7u7x8fHq6ur6+vr09PT4+Pj////t7e2i2uzk5OTW1tbDw8PJyMbe2dDMy8nHx8fY2Nij
2+yx6fqLi4sAAAAxLCTex6COjo607P2w6Pn5+fiNjYwFBQUGBgY2MSnfyKLeyKLZwpyQj4/+/v2z
6/yeyL/g077h4eH7+/vj4uEEBAOex77i1b+PurPIs5DVyraurK8+OEJpZGz5+fnJycmLtrHCrozS
x7Sdmp4KAg9AOkTU09WxrrKdmp9YU1zJx8qWwLjSvJfbz7rZ2dqIhYpix9qEx8qGztuJ2O+PeQbc
AAAAAWJLR0QfBQ0QvQAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB+UKHwIAFabOT3wAAAIm
SURBVHja7dzHUgJREEZhMyoqghEx55wDmEXMmHPG938Jd9Ms/iq4VQMGzlnP7faDWVi3LMvKiIiI
iIiI/kDlFflXqUdUOowoLxikqjr/avSIGocRVUCAAAECBAgQIECAAAECBAgQIH8TEqjNvzo9os5h
RKBgkPpg/jXoEQ0OI+qBAAECBAgQIECAAAECBAgQIKUAaWzyCtmS5nCOIi2ySK5zzbYjZJsbfYC0
yk+rzeF+yqk2ua4VCBAgQIAAAQIECBAgQIAAAVJikPYOVWeuO5Lsol2q6iJDYt2qnqBDvX2qfiBA
gAABAgQIECBAgAABAgRIiUEGBlVDw6qRUYfGxlUT7apJHyBT8rOfnlHNzjk0K0fMy+9pAQgQIECA
AAECBAgQIECAAAHybyGLS6rlFa9Vay3ulViXJeyJtayDNm1jU7XlA2Q7rtrZ9cq64tqz1cl9WdKe
2LNzMZu2I9dt+wBJyffiwP4wKSpfhrB8cWbC8uGoTTuQ61JAgAABAgQIECBAgAABAgQIkH8LOTxS
Hdvqk1OvM/vZ0ueytD1xZudObNqxXHfoA+TiUnVlq69vvG77HLq1c9c27UquuwACBAgQIECAFAly
d+/18OjQg527+xWQrF8an24cerJzUSBAgAABAgRIkSDPL6pXWx2z/87y9u7Qm52L2bRXue7ZB0jO
ey1/+8ELOiBAgAABAqQUIB+fqsxXgcrIdR8+QIiIiIiIiArTN9zHhQ6b8BuBAAAAJXRFWHRkYXRl
OmNyZWF0ZQAyMDIxLTEwLTMxVDAyOjAwOjE4KzAwOjAwHDgI0wAAACV0RVh0ZGF0ZTptb2RpZnkA
MjAyMS0xMC0zMVQwMjowMDoxOCswMDowMG1lsG8AAAAASUVORK5CYII=" />
                </svg>
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
