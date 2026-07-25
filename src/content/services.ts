export type ServiceCard = {
    title: string;
    items: readonly string[];
};

export type ServiceDetail = {
    slug: string;
    title: string;
    summary: string;
    introduction: readonly string[];
    cards: readonly ServiceCard[];
};

export const serviceDetails = {
    accountingOperations: {
        slug: 'accounting-operations',
        title: 'Accounting Operations',
        summary:
            'Manage the financial foundation of your business through bookkeeping, accounts payable and receivable, payroll administration, and month-end close support.',
        introduction: [
            'Strong financial operations begin with accurate, timely, and scalable accounting processes. Our Accounting Operations services provide businesses with the structure and visibility needed to support growth and improve decision-making.',
        ],
        cards: [
            {
                title: 'Accounts Receivable',
                items: ['Billing', 'Collections', 'Revenue Tracking'],
            },
            {
                title: 'Accounts Payable',
                items: [
                    'Vendor Management',
                    'Invoice Processing',
                    'Payment Workflows',
                ],
            },
            {
                title: 'Payroll Administration',
                items: [
                    'Payroll Processing',
                    'Employee Reporting',
                    'Compliance Support',
                ],
            },
            {
                title: 'Bookkeeping',
                items: [
                    'General ledger management',
                    'Journal entries',
                    'Month-end close',
                    'Bank reconciliations',
                ],
            },
        ],
    },
    complianceServices: {
        slug: 'compliance-services',
        title: 'Compliance Services',
        summary:
            'Maintain confidence through financial reporting, audit readiness, tax support, internal controls, and risk management.',
        introduction: [
            'As businesses grow, financial compliance becomes increasingly complex. Our Compliance Services help organizations navigate reporting requirements, strengthen internal controls, reduce risk, and maintain confidence in their financial operations. By combining compliance expertise with proactive support, we help businesses stay prepared, protected, and positioned for sustainable growth.',
        ],
        cards: [
            {
                title: 'Financial Compliance',
                items: [
                    'GAAP Reporting',
                    'Internal Controls',
                    'Audit Preparation',
                ],
            },
            {
                title: 'Tax Support',
                items: [
                    'Tax-Ready Financials',
                    'Sales Tax Support',
                    'CPA Coordination',
                ],
            },
            {
                title: 'Risk Management',
                items: [
                    'Process Documentation',
                    'Compliance Reviews',
                    'Internal Control Assessments',
                ],
            },
        ],
    },
    financialAdvisory: {
        slug: 'financial-advisory',
        title: 'Financial Advisory',
        summary:
            'Gain strategic insights through controller services, FP&A, forecasting, budgeting, KPI development, and fractional CFO leadership.',
        introduction: [
            'Financial success requires more than accurate reporting—it requires insight and planning. Our Financial Advisory services help businesses gain a deeper understanding of their financial performance and make informed decisions with confidence.',
            'From controller oversight and financial planning to executive-level CFO guidance, we provide the strategic expertise organizations need to navigate complexity, improve performance, and achieve long-term objectives.',
        ],
        cards: [
            {
                title: 'Controller Services',
                items: [
                    'Financial Oversight',
                    'Close Management',
                    'KPI Development',
                    'Internal Reporting',
                ],
            },
            {
                title: 'FP&A Services',
                items: [
                    'Budgeting',
                    'Forecasting',
                    'Scenario Planning',
                    'Performance Analytics',
                ],
            },
            {
                title: 'Fractional CFO Services',
                items: [
                    'Strategic Planning',
                    'Cash Flow Forecasting',
                    'Capital Planning',
                    'Board Reporting',
                    'Financial Leadership',
                ],
            },
        ],
    },
    technologyAutomation: {
        slug: 'technology-automation',
        title: 'Technology & Automation',
        summary:
            'Modernize finance operations through workflow optimization, ERP support, intelligent automation, and scalable financial systems.',
        introduction: [
            'Our Technology & Automation services help businesses streamline workflows, improve data accuracy, reduce administrative burdens, and create finance operations built for growth.',
            'By combining intelligent automation and process optimization, we help organizations build connected finance ecosystems that provide greater visibility, efficiency, and scalability.',
        ],
        cards: [
            {
                title: 'Finance Transformation',
                items: [
                    'ERP Implementation Support',
                    'Workflow Optimization',
                    'Process Redesign',
                ],
            },
            {
                title: 'Intelligent Automation',
                items: [
                    'Automated Reconciliations',
                    'AP Workflow Automation',
                    'KPI Dashboards',
                    'Reporting Automation',
                ],
            },
            {
                title: 'Supported Platforms',
                items: [
                    'QuickBooks',
                    'NetSuite',
                    'Sage Intacct',
                    'Xero',
                    'Microsoft Dynamics',
                    'Bill.com',
                    'Ramp',
                    'Expensify',
                ],
            },
        ],
    },
} as const satisfies Record<string, ServiceDetail>;
