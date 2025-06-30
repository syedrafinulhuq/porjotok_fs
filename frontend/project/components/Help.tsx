"use client";

import { useState } from 'react';
import { Search, MessageCircle, Book, Video, Mail, Phone, ExternalLink, ChevronDown, ChevronRight } from 'lucide-react';

export default function Help() {
  const [activeTab, setActiveTab] = useState('faq');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqItems = [
    {
      id: 1,
      question: 'How do I connect my social media accounts?',
      answer: 'To connect your social media accounts, go to the sidebar and look for "Connected Accounts" section. Click on the platform you want to connect and follow the authentication process. You\'ll need to authorize Porjotok to access your account data.'
    },
    {
      id: 2,
      question: 'Can I schedule posts for multiple platforms at once?',
      answer: 'Yes! When creating a post, you can select multiple platforms to publish to simultaneously. Just check the platforms you want to include and set your preferred scheduling time.'
    },
    {
      id: 3,
      question: 'How does the budgeting feature work?',
      answer: 'The budgeting feature allows you to set spending limits for your social media campaigns. You can create budgets for different platforms, track your spending in real-time, and receive alerts when you\'re approaching your limits.'
    },
    {
      id: 4,
      question: 'What analytics data can I access?',
      answer: 'You can access comprehensive analytics including engagement rates, reach, impressions, follower growth, top-performing posts, and detailed demographic information about your audience across all connected platforms.'
    },
    {
      id: 5,
      question: 'Is my data secure?',
      answer: 'Yes, we take data security very seriously. All data is encrypted in transit and at rest. We use industry-standard security practices and never share your personal information with third parties without your consent.'
    },
    {
      id: 6,
      question: 'How do I join or create groups?',
      answer: 'You can browse and join groups from the Groups section. To create a new group, click the "Create Group" button and fill in the details. You can make groups public or private depending on your needs.'
    }
  ];

  const tutorials = [
    {
      id: 1,
      title: 'Getting Started with Porjotok',
      description: 'Learn the basics of setting up your account and connecting social media platforms',
      duration: '5 min',
      type: 'video'
    },
    {
      id: 2,
      title: 'Creating Your First Post',
      description: 'Step-by-step guide to creating and scheduling your first social media post',
      duration: '3 min',
      type: 'article'
    },
    {
      id: 3,
      title: 'Understanding Analytics',
      description: 'How to read and interpret your social media analytics data',
      duration: '8 min',
      type: 'video'
    },
    {
      id: 4,
      title: 'Budget Management',
      description: 'Setting up and managing budgets for your social media campaigns',
      duration: '6 min',
      type: 'article'
    },
    {
      id: 5,
      title: 'Using Groups Effectively',
      description: 'Best practices for joining and managing social media groups',
      duration: '4 min',
      type: 'video'
    }
  ];

  const contactOptions = [
    {
      type: 'Live Chat',
      description: 'Get instant help from our support team',
      availability: 'Available 24/7',
      icon: MessageCircle,
      action: 'Start Chat'
    },
    {
      type: 'Email Support',
      description: 'Send us a detailed message about your issue',
      availability: 'Response within 24 hours',
      icon: Mail,
      action: 'Send Email'
    },
    {
      type: 'Phone Support',
      description: 'Speak directly with a support representative',
      availability: 'Mon-Fri, 9AM-6PM EST',
      icon: Phone,
      action: 'Call Now'
    }
  ];

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Help & Support</h1>
        <div className="form-control">
          <div className="input-group">
            <span className="bg-base-200">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search help articles..."
              className="input input-bordered w-64"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs tabs-boxed">
        <button 
          className={`tab ${activeTab === 'faq' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('faq')}
        >
          FAQ
        </button>
        <button 
          className={`tab ${activeTab === 'tutorials' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('tutorials')}
        >
          Tutorials
        </button>
        <button 
          className={`tab ${activeTab === 'contact' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          Contact Support
        </button>
      </div>

      {/* FAQ Tab */}
      {activeTab === 'faq' && (
        <div className="space-y-6">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                {faqItems.map((item) => (
                  <div key={item.id} className="border border-base-300 rounded-lg">
                    <button
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-base-200 transition-colors"
                      onClick={() => toggleFaq(item.id)}
                    >
                      <span className="font-semibold">{item.question}</span>
                      {expandedFaq === item.id ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </button>
                    {expandedFaq === item.id && (
                      <div className="p-4 pt-0 border-t border-base-300">
                        <p className="text-sm opacity-80">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Still need help?</h2>
              <p className="opacity-70 mb-4">Can't find what you're looking for? Our support team is here to help.</p>
              <div className="flex gap-2">
                <button className="btn btn-primary">Contact Support</button>
                <button className="btn btn-outline">Browse All Articles</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tutorials Tab */}
      {activeTab === 'tutorials' && (
        <div className="space-y-6">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Video Tutorials & Guides</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tutorials.map((tutorial) => (
                  <div key={tutorial.id} className="p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">{tutorial.title}</h3>
                      <div className="flex items-center gap-2">
                        {tutorial.type === 'video' ? (
                          <Video className="w-4 h-4 text-primary" />
                        ) : (
                          <Book className="w-4 h-4 text-secondary" />
                        )}
                        <span className="text-xs opacity-70">{tutorial.duration}</span>
                      </div>
                    </div>
                    <p className="text-sm opacity-70 mb-3">{tutorial.description}</p>
                    <button className="btn btn-primary btn-sm">
                      {tutorial.type === 'video' ? 'Watch Video' : 'Read Article'}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title">Quick Start Guide</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-content text-xs font-bold">1</div>
                    <span className="text-sm">Connect your social media accounts</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-content text-xs font-bold">2</div>
                    <span className="text-sm">Create your first post</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-content text-xs font-bold">3</div>
                    <span className="text-sm">Set up your budget</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-content text-xs font-bold">4</div>
                    <span className="text-sm">Explore analytics</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title">Resources</h2>
                <div className="space-y-3">
                  <a href="#" className="flex items-center justify-between p-2 hover:bg-base-200 rounded transition-colors">
                    <span className="text-sm">API Documentation</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a href="#" className="flex items-center justify-between p-2 hover:bg-base-200 rounded transition-colors">
                    <span className="text-sm">Best Practices Guide</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a href="#" className="flex items-center justify-between p-2 hover:bg-base-200 rounded transition-colors">
                    <span className="text-sm">Community Forum</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a href="#" className="flex items-center justify-between p-2 hover:bg-base-200 rounded transition-colors">
                    <span className="text-sm">Feature Requests</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Support Tab */}
      {activeTab === 'contact' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactOptions.map((option, index) => (
              <div key={index} className="card bg-base-100 shadow-lg">
                <div className="card-body text-center">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <option.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{option.type}</h3>
                  <p className="text-sm opacity-70 mb-2">{option.description}</p>
                  <p className="text-xs opacity-60 mb-4">{option.availability}</p>
                  <button className="btn btn-primary btn-sm">{option.action}</button>
                </div>
              </div>
            ))}
          </div>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Send us a message</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input type="text" placeholder="Your name" className="input input-bordered" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="email" placeholder="your@email.com" className="input input-bordered" />
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Subject</span>
                </label>
                <select className="select select-bordered">
                  <option>General Question</option>
                  <option>Technical Issue</option>
                  <option>Billing Question</option>
                  <option>Feature Request</option>
                  <option>Bug Report</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Message</span>
                </label>
                <textarea className="textarea textarea-bordered h-32" placeholder="Describe your issue or question..."></textarea>
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-outline">Save Draft</button>
                <button className="btn btn-primary">Send Message</button>
              </div>
            </div>
          </div>

          <div className="alert alert-info">
            <MessageCircle className="w-4 h-4" />
            <div>
              <h3 className="font-bold">Need immediate help?</h3>
              <div className="text-xs">Try our live chat for instant support, or check our FAQ section for quick answers to common questions.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}