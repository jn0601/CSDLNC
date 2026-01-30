import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    if (!links || links.length <= 3) return null;

    // Translate pagination labels to Vietnamese
    const translateLabel = (label) => {
        const cleanLabel = label.replace(/&laquo;|&raquo;/g, '').trim();
        if (cleanLabel === 'Previous') return '&laquo; Trước';
        if (cleanLabel === 'Next') return 'Tiếp &raquo;';
        return label;
    };

    return (
        <nav className="flex items-center justify-center space-x-1 mt-6">
            {links.map((link, index) => {
                // Skip if no URL (disabled state)
                if (!link.url) {
                    return (
                        <span
                            key={index}
                            className="px-3 py-2 text-sm text-gray-400 dark:text-gray-600 cursor-not-allowed"
                            dangerouslySetInnerHTML={{ __html: translateLabel(link.label) }}
                        />
                    );
                }

                return (
                    <Link
                        key={index}
                        href={link.url}
                        className={`px-3 py-2 text-sm rounded-md transition-colors duration-150 ${
                            link.active
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                        }`}
                        dangerouslySetInnerHTML={{ __html: translateLabel(link.label) }}
                    />
                );
            })}
        </nav>
    );
}
