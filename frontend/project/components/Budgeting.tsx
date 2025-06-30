"use client";

import { DollarSign, TrendingUp, TrendingDown, CreditCard, PiggyBank, Target, AlertCircle } from 'lucide-react';

export default function Budgeting() {
  const budgetOverview = {
    totalBudget: 5000,
    spent: 3250,
    remaining: 1750,
    monthlyTarget: 4500
  };

  const campaigns = [
    {
      id: 1,
      name: 'Instagram Ads Campaign',
      platform: 'Instagram',
      budget: 1500,
      spent: 1200,
      remaining: 300,
      performance: 'good',
      roi: '+24%'
    },
    {
      id: 2,
      name: 'Facebook Brand Awareness',
      platform: 'Facebook',
      budget: 2000,
      spent: 1800,
      remaining: 200,
      performance: 'excellent',
      roi: '+45%'
    },
    {
      id: 3,
      name: 'LinkedIn Professional',
      platform: 'LinkedIn',
      budget: 1000,
      spent: 250,
      remaining: 750,
      performance: 'average',
      roi: '+12%'
    },
    {
      id: 4,
      name: 'Twitter Engagement',
      platform: 'Twitter',
      budget: 500,
      spent: 0,
      remaining: 500,
      performance: 'pending',
      roi: 'N/A'
    }
  ];

  const expenses = [
    { category: 'Ad Spend', amount: 2800, percentage: 86 },
    { category: 'Content Creation', amount: 300, percentage: 9 },
    { category: 'Tools & Software', amount: 150, percentage: 5 }
  ];

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent': return 'text-success';
      case 'good': return 'text-info';
      case 'average': return 'text-warning';
      case 'pending': return 'text-base-content/60';
      default: return 'text-base-content';
    }
  };

  const getPerformanceBadge = (performance: string) => {
    switch (performance) {
      case 'excellent': return 'badge-success';
      case 'good': return 'badge-info';
      case 'average': return 'badge-warning';
      case 'pending': return 'badge-neutral';
      default: return 'badge-neutral';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Budget Management</h1>
        <div className="flex gap-2">
          <button className="btn btn-outline btn-sm">Export Report</button>
          <button className="btn btn-primary btn-sm">
            <DollarSign className="w-4 h-4 mr-2" />
            Add Budget
          </button>
        </div>
      </div>

      {/* Budget Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Total Budget</p>
                <p className="text-2xl font-bold">${budgetOverview.totalBudget.toLocaleString()}</p>
                <p className="text-sm text-info">This month</p>
              </div>
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <PiggyBank className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Amount Spent</p>
                <p className="text-2xl font-bold">${budgetOverview.spent.toLocaleString()}</p>
                <p className="text-sm text-warning">65% of budget</p>
              </div>
              <div className="p-3 rounded-full bg-warning/10 text-warning">
                <CreditCard className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Remaining</p>
                <p className="text-2xl font-bold">${budgetOverview.remaining.toLocaleString()}</p>
                <p className="text-sm text-success">35% left</p>
              </div>
              <div className="p-3 rounded-full bg-success/10 text-success">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Monthly Target</p>
                <p className="text-2xl font-bold">${budgetOverview.monthlyTarget.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-success" />
                  <p className="text-sm text-success">On track</p>
                </div>
              </div>
              <div className="p-3 rounded-full bg-info/10 text-info">
                <Target className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Budget Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Campaign Budgets</h2>
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="p-4 bg-base-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-sm">{campaign.name}</h3>
                    <span className={`badge ${getPerformanceBadge(campaign.performance)} badge-sm`}>
                      {campaign.performance}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs opacity-70 mb-2">
                    <span>{campaign.platform}</span>
                    <span>ROI: {campaign.roi}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Budget: ${campaign.budget}</span>
                    <span className="text-sm">Spent: ${campaign.spent}</span>
                  </div>
                  <div className="w-full bg-base-300 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span>Remaining: ${campaign.remaining}</span>
                    <span>{Math.round((campaign.spent / campaign.budget) * 100)}% used</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Expense Breakdown</h2>
            <div className="space-y-4">
              {expenses.map((expense, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm">{expense.category}</span>
                      <span className="text-sm">${expense.amount}</span>
                    </div>
                    <div className="w-full bg-base-300 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${expense.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs opacity-70 mt-1">{expense.percentage}% of total</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="divider"></div>

            <div className="alert alert-info">
              <AlertCircle className="w-4 h-4" />
              <div>
                <h3 className="font-bold">Budget Alert</h3>
                <div className="text-xs">You're 65% through your monthly budget with 10 days remaining.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Planning */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title">Set New Budget</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Campaign Name</span>
              </label>
              <input type="text" placeholder="Enter campaign name" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Platform</span>
              </label>
              <select className="select select-bordered">
                <option>Instagram</option>
                <option>Facebook</option>
                <option>Twitter</option>
                <option>LinkedIn</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Budget Amount</span>
              </label>
              <input type="number" placeholder="0.00" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Duration</span>
              </label>
              <select className="select select-bordered">
                <option>1 Week</option>
                <option>2 Weeks</option>
                <option>1 Month</option>
                <option>3 Months</option>
              </select>
            </div>
          </div>
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-outline">Save Draft</button>
            <button className="btn btn-primary">Create Budget</button>
          </div>
        </div>
      </div>
    </div>
  );
}