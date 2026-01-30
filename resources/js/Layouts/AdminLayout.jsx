import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminLayout({ header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                                </Link>
                            </div>

                            {/* Main Navigation - Vietnamese Labels */}
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Trang Chủ
                                </NavLink>
                                <NavLink
                                    href={route('khach-hang.index')}
                                    active={route().current('khach-hang.*')}
                                >
                                    Khách Hàng
                                </NavLink>
                                <NavLink
                                    href={route('nhan-vien.index')}
                                    active={route().current('nhan-vien.*')}
                                >
                                    Nhân Viên
                                </NavLink>
                                <NavLink
                                    href={route('san-pham.index')}
                                    active={route().current('san-pham.*')}
                                >
                                    Sản Phẩm
                                </NavLink>
                                <NavLink
                                    href={route('hoa-don.index')}
                                    active={route().current('hoa-don.*')}
                                >
                                    Hóa Đơn
                                </NavLink>
                                <NavLink
                                    href={route('chi-tiet-hoa-don.index')}
                                    active={route().current('chi-tiet-hoa-don.*')}
                                >
                                    Chi Tiết HD
                                </NavLink>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Responsive Navigation Menu */}
                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Trang Chủ
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('khach-hang.index')}
                            active={route().current('khach-hang.*')}
                        >
                            Khách Hàng
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('nhan-vien.index')}
                            active={route().current('nhan-vien.*')}
                        >
                            Nhân Viên
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('san-pham.index')}
                            active={route().current('san-pham.*')}
                        >
                            Sản Phẩm
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('hoa-don.index')}
                            active={route().current('hoa-don.*')}
                        >
                            Hóa Đơn
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('chi-tiet-hoa-don.index')}
                            active={route().current('chi-tiet-hoa-don.*')}
                        >
                            Chi Tiết Hóa Đơn
                        </ResponsiveNavLink>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
