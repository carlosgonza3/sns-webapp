export type PackageDetail = {
    slug: string;
    number: string;
    title: string;
    tagline: string;
    description: string;
    included: readonly string[];
    idealFor: readonly string[];
    palette: 1 | 2 | 3;
};

export const packageDetails = {
    essentialAccounting: {
        slug: 'essential-accounting',
        number: '01',
        title: 'Essential Accounting',
        tagline: 'Build a Strong Financial Foundation',
        description:
            'Designed for businesses seeking reliable accounting support, financial accuracy, and greater operational visibility.',
        included: [
            'Bookkeeping',
            'Bank Reconciliations',
            'Month-End Close',
            'Financial Statements',
            'Monthly Reporting Package',
        ],
        idealFor: [
            'Small Businesses',
            'Early-Stage Companies',
            'Organizations seeking foundational accounting support',
        ],
        palette: 1,
    },
    growthFinance: {
        slug: 'growth-finance',
        number: '02',
        title: 'Growth Finance',
        tagline: 'Scale With Confidence',
        description:
            'A comprehensive finance solution designed for organizations experiencing growth, increased complexity, and evolving operational demands.',
        included: [
            'Full Accounting Operations',
            'Accounts Payable Management',
            'Accounts Receivable Management',
            'Payroll Oversight',
            'Compliance Support',
            'Controller Review',
            'KPI Dashboards',
        ],
        idealFor: [
            'Growing Businesses',
            'Scaling Organizations',
            'Companies requiring enhanced financial visibility',
        ],
        palette: 2,
    },
    strategicCfo: {
        slug: 'strategic-cfo',
        number: '03',
        title: 'Strategic CFO Package',
        tagline: 'Executive Financial Leadership',
        description:
            'Designed for organizations that require executive-level financial expertise, strategic planning, and forward-looking guidance to support long-term growth and complex business decisions.',
        included: [
            'Full Accounting Operations',
            'Fractional CFO Services',
            'Budgeting',
            'Forecasting',
            'Cash Flow Management',
            'Board Reporting',
            'Strategic Planning',
            'Financial Performance Reviews',
            'Executive Financial Leadership',
        ],
        idealFor: [
            'Mid-Sized Businesses',
            'Private Equity-Backed Companies',
            'Organizations preparing for rapid growth, financing, or acquisition',
        ],
        palette: 3,
    },
} as const satisfies Record<string, PackageDetail>;
