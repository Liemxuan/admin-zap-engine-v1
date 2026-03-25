import React from 'react';
import { MainLayout } from '../../../app/layouts/MainLayout.tsx';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

/**
 * PageDashboard renders the full content from dist/index.html (Component Showcase)
 * 100% HTML converted to JSX format.
 */
export const PageDashboard: React.FC = () => {
    const { t } = useLanguage();

    return (
        <MainLayout title={t('sidebar.dashboard')}>
            <div className="p-6 md:p-12">
                <div className="max-w-full mx-auto space-y-24">
                    {/* Hero */}
                    <section className="space-y-4">
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900">Component <span className="text-[#2b7fff]">Library</span></h1>
                        <p className="text-slate-500 max-w-lg">Premium UI components built with Tailwind CSS v4, optimized for speed and aesthetic excellence.</p>
                    </section>

                    {/* Buttons Showcase */}
                    <section id="buttons" className="space-y-6">
                        <h2 className="text-xl font-bold border-b border-slate-100 pb-2 text-slate-900">Buttons</h2>
                        <div className="grid grid-cols-1 gap-12">
                            <div className="space-y-4">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Variants</p>
                                <div className="flex flex-wrap gap-4 items-center">
                                    <zap-button label="Standard Button" variant="contained" color="primary"></zap-button>
                                    <zap-button id="counter-btn" label="Count is 0" variant="outlined" color="secondary" icon="plus"></zap-button>
                                    <zap-button label="Premium Action" variant="premium"></zap-button>
                                    <zap-button variant="text" label="Text"></zap-button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sizes</p>
                                    <div className="flex flex-wrap gap-4 items-end">
                                        <zap-button size="small" label="Small"></zap-button>
                                        <zap-button size="medium" label="Medium"></zap-button>
                                        <zap-button size="large" label="Large"></zap-button>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Colors</p>
                                    <div className="flex flex-wrap gap-4 items-center">
                                        <zap-button color="success" label="Success"></zap-button>
                                        <zap-button color="error" label="Error"></zap-button>
                                        <zap-button color="secondary" label="Secondary"></zap-button>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Interactive Features</p>
                                <div className="flex flex-wrap gap-4 items-center">
                                    <zap-button disabled label="Disabled"></zap-button>
                                    <zap-button loading label="Processing"></zap-button>
                                    <zap-button border-radius="9999px" label="Fully Rounded"></zap-button>
                                    <zap-button border-radius="0px" label="Sharp Edges"></zap-button>
                                    <zap-button variant="premium" label="Alert On Click" onClick={() => alert('ZAP Web Component: Event Triggered!')}></zap-button>
                                    <zap-button href="https://mui.com/material-ui/api/button/" label="View MUI API Docs"></zap-button>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Icon Buttons</p>
                                <div className="flex flex-wrap gap-4 items-center">
                                    <zap-button icon="plus" label="Add New"></zap-button>
                                    <zap-button variant="outlined" color="secondary" icon="search" label="Search"></zap-button>
                                    <zap-button variant="text" color="success" icon="check-circle" label="Confirm"></zap-button>
                                    <zap-button color="error" icon="trash-2" label="Delete"></zap-button>
                                    <zap-button variant="premium" icon="send" border-radius="50%"></zap-button>
                                    <zap-button variant="contained" icon="settings" border-radius="0.75rem"></zap-button>
                                    <zap-button variant="outlined" icon="download" size="small" border-radius="50%"></zap-button>
                                    <zap-button variant="text" icon="alert-circle" size="large"></zap-button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Inputs Showcase */}
                    <section id="inputs" className="space-y-6">
                        <h2 className="text-xl font-bold border-b border-slate-100 pb-2 text-slate-900">Inputs</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sizes & States</p>
                                <div className="space-y-4">
                                    <zap-input label="Default Input" placeholder="Type something..." fullwidth></zap-input>
                                    <zap-input size="small" label="Small Input" placeholder="Smaller text..."></zap-input>
                                    <zap-input variant="large" label="Large Input" placeholder="Larger text..." fullwidth></zap-input>
                                    <zap-input disabled label="Disabled State" value="Blocked content"></zap-input>
                                    <zap-input readonly label="Read Only" value="You can only read this"></zap-input>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Icons & Validation</p>
                                <div className="space-y-4">
                                    <zap-input icon-start="search" placeholder="Search components..." fullwidth></zap-input>
                                    <zap-input type="password" required icon-end="settings" label="Encrypted Key" fullwidth></zap-input>
                                    <zap-input icon-start="user" icon-end="check-circle" label="Username" value="antigravity_dev" fullwidth></zap-input>
                                    <zap-input error helper-text="Please enter a valid email address" label="Email Address" value="invalid-email" fullwidth></zap-input>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Floating Labels</p>
                                <div className="space-y-4">
                                    <zap-input label="Floating Email" label-position="floating" fullwidth></zap-input>
                                    <zap-input label="Floating Password" label-position="floating" type="password" icon-start="lock" fullwidth></zap-input>
                                    <zap-input label="Toggle Password Demo" type="password" value="secret123" fullwidth></zap-input>
                                    <zap-input label="With Value" label-position="floating" value="Hello World" fullwidth type="text"></zap-input>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Checkboxes Showcase */}
                    <section id="checkboxes" className="space-y-6">
                        <h2 className="text-xl font-bold border-b border-slate-100 pb-2 text-slate-900">Checkboxes</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Basic Checkboxes</p>
                                <div className="flex flex-col gap-4">
                                    <zap-checkbox label="Default Checkbox"></zap-checkbox>
                                    <zap-checkbox label="Checked by Default" checked></zap-checkbox>
                                    <zap-checkbox label="Disabled Checkbox" disabled></zap-checkbox>
                                    <zap-checkbox label="Disabled & Checked" disabled checked></zap-checkbox>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Validation & Helpers</p>
                                <div className="flex flex-col gap-4">
                                    <zap-checkbox label="Accept Terms & Conditions" required></zap-checkbox>
                                    <zap-checkbox label="Newsletter" helper-text="Receive weekly updates about ZAP Design"></zap-checkbox>
                                    <zap-checkbox label="Error State" error helper-text="You must check this box to proceed"></zap-checkbox>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Radios Showcase */}
                    <section id="radios" className="space-y-6">
                        <h2 className="text-xl font-bold border-b border-slate-100 pb-2 text-slate-900">Radios</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Basic Radios</p>
                                <div className="flex flex-col gap-4">
                                    <zap-radio name="group1" label="Option 1" value="1" checked></zap-radio>
                                    <zap-radio name="group1" label="Option 2" value="2"></zap-radio>
                                    <zap-radio name="group2" label="Disabled Option" disabled></zap-radio>
                                    <zap-radio name="group2" label="Disabled & Checked" disabled checked></zap-radio>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Validation & Helpers</p>
                                <div className="flex flex-col gap-4">
                                    <zap-radio name="plan" label="Basic Plan" helper-text="Free forever for individuals"></zap-radio>
                                    <zap-radio name="plan" label="Pro Plan" helper-text="$19/month for professionals"></zap-radio>
                                    <zap-radio name="error-demo" label="Error State" error helper-text="Please select a valid option"></zap-radio>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Switches Showcase */}
                    <section id="switches" className="space-y-6">
                        <h2 className="text-xl font-bold border-b border-slate-100 pb-2 text-slate-900">Switches</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Toggle States</p>
                                <div className="flex flex-col gap-6">
                                    <zap-switch label="System Notifications"></zap-switch>
                                    <zap-switch label="Dark Mode" checked></zap-switch>
                                    <zap-switch label="Auto Update" helper-text="Check for updates automatically every 24 hours"></zap-switch>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sizes & States</p>
                                <div className="flex flex-col gap-6">
                                    <zap-switch size="small" label="Compact Mode"></zap-switch>
                                    <zap-switch label="Standard Switch"></zap-switch>
                                    <zap-switch label="Premium Feature" disabled checked helper-text="Locked for free accounts"></zap-switch>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Cards Showcase */}
                    <section id="cards" className="space-y-6 pb-24">
                        <h2 className="text-xl font-bold border-b border-slate-100 pb-2 text-slate-900">Cards</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <zap-card variant="default">
                                <div slot="header" className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <h3 className="text-base font-semibold text-slate-900">Cloud Deployment</h3>
                                        <p className="text-xs text-slate-500">Production environment</p>
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                </div>
                                <div className="text-sm leading-relaxed text-slate-500">
                                    Your application is currently running at peak efficiency. All systems functional.
                                </div>
                                <div slot="footer" className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                                    v1.0.4 • Stable
                                </div>
                            </zap-card>

                            <zap-card variant="glass" shadow="xl">
                                <div slot="header">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">Premium Support</h3>
                                    <p className="text-sm text-slate-500">Get 24/7 access to our engineering team.</p>
                                </div>
                                <div className="text-sm text-slate-500">
                                    Direct line to our core developers and architectural consulting.
                                </div>
                                <div slot="footer">
                                    <zap-button label="Upgrade Now" variant="premium" size="small"></zap-button>
                                </div>
                            </zap-card>
                        </div>
                    </section>

                    {/* Badges Showcase */}
                    <section id="badges" className="space-y-6 pb-12">
                        <h2 className="text-xl font-bold border-b border-slate-100 pb-2 text-slate-900">Badges</h2>
                        <div className="flex flex-wrap gap-4 items-center">
                            <zap-badge label="Primary">Active</zap-badge>
                            <zap-badge variant="success" shape="circle">Online</zap-badge>
                            <zap-badge variant="warning" appearance="light">Pending</zap-badge>
                            <zap-badge variant="destructive" size="sm">Critical</zap-badge>
                            <zap-badge variant="info" appearance="outline">Feature</zap-badge>
                            <zap-badge variant="secondary" size="xs">v1.2.0</zap-badge>
                        </div>
                    </section>

                    {/* Alerts Showcase */}
                    <section id="alerts" className="space-y-6 pb-12">
                        <h2 className="text-xl font-bold border-b border-slate-100 pb-2 text-slate-900">Alerts</h2>
                        <div className="space-y-4 max-w-2xl">
                            <zap-alert variant="primary" icon="info" appearance="light">
                                <span slot="title">Update available</span>
                                A new version of the design system is available. Upgrade now for new components.
                            </zap-alert>
                            <zap-alert variant="success" icon="check-circle" closeable>
                                <span slot="title">Success!</span>
                                Your profile has been updated successfully.
                            </zap-alert>
                            <zap-alert variant="destructive" icon="alert-circle" closeable>
                                <span slot="title">System Error</span>
                                Unable to save changes. Please check your connection and try again.
                            </zap-alert>
                        </div>
                    </section>

                    {/* Dialogs Showcase */}
                    <section id="dialogs" className="space-y-6 pb-12">
                        <h2 className="text-xl font-bold border-b border-slate-100 pb-2 text-slate-900">Dialogs</h2>
                        <div className="flex gap-4">
                            <zap-button label="Open Modal" onClick={() => (document.getElementById('demo-modal') as any).show()}></zap-button>
                            <zap-dialog id="demo-modal" title="Welcome to ZAP" description="This is our new native dialog component with backdrop blur.">
                                <div className="space-y-4">
                                    <p className="text-slate-500 text-sm">Modal components in ZAP use the native HTML5 &lt;dialog&gt; API for maximum performance and accessibility.</p>
                                    <zap-skeleton variant="text" width="80%"></zap-skeleton>
                                    <zap-skeleton variant="text" width="60%"></zap-skeleton>
                                </div>
                                <div slot="footer" className="flex gap-2">
                                    <zap-button label="Close" variant="outlined" onClick={() => (document.getElementById('demo-modal') as any).close()}></zap-button>
                                    <zap-button label="Continue" variant="contained" onClick={() => (document.getElementById('demo-modal') as any).close()}></zap-button>
                                </div>
                            </zap-dialog>
                        </div>
                    </section>

                    {/* Tabs Showcase */}
                    <section id="tabs" className="space-y-6">
                        <h2 className="text-xl font-bold border-b border-slate-100 pb-2 text-slate-900">Tabs (Owner Series)</h2>
                        <div className="space-y-12">
                            <zap-tabs active-tab="account">
                                <zap-tab-item tab-id="account" label="Account" icon="user">
                                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                        <h3 className="font-bold text-slate-900 mb-2">Account Settings</h3>
                                        <p className="text-slate-500 text-sm">Manage your profile information and security preferences.</p>
                                    </div>
                                </zap-tab-item>
                                <zap-tab-item tab-id="notifications" label="Notifications" icon="search">
                                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                        <h3 className="font-bold text-slate-900 mb-2">Notification Center</h3>
                                        <p className="text-slate-500 text-sm">Configure how you receive alerts and updates.</p>
                                    </div>
                                </zap-tab-item>
                            </zap-tabs>
                        </div>
                    </section>

                    {/* Accordions Showcase */}
                    <section id="accordions" className="space-y-6 pb-24">
                        <h2 className="text-xl font-bold border-b border-slate-100 pb-2 text-slate-900">Accordions (Owner Series)</h2>
                        <div className="max-w-2xl">
                            <zap-accordion>
                                <zap-accordion-item title="Project details" icon="layout" open>Experience a new level of productivity with our integrated workspace solutions.</zap-accordion-item>
                                <zap-accordion-item title="Security settings" icon="lock">Configure advanced encryption and multi-factor authentication for your team members.</zap-accordion-item>
                            </zap-accordion>
                        </div>
                    </section>
                </div>
            </div>
        </MainLayout>
    );
};
