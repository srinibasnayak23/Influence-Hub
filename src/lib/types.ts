export type Campaign = {
  id: string;
  title: string;
  brandName: string;
  brandLogo: string;
  budget: number;
  description: string;
  deliverables: string[];
  startDate: string;
  endDate: string;
  category: string;
  tags: string[];
  status: 'Open' | 'In Progress' | 'Completed';
  impressions: number;
  engagement: number;
  image: string;
};

export type Influencer = {
  id: string;
  name: string;
  avatar: string;
  category: string;
  tags: string[];
  followers: number;
  engagementRate: number;
  bio: string;
};

export type Proposal = {
  id: string;
  campaignId: string;
  influencerId: string;
  influencerName: string;
  influencerAvatar: string;
  price: number;
  pitch: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
};

export type Collaboration = {
  id: string;
  campaignId: string;
  campaignTitle: string;
  influencerId: string;
  influencerName: string;
  influencerAvatar: string;
  brandName: string;
  brandLogo: string;
  status: 'Active' | 'Completed';
  milestones: Milestone[];
};

export type Milestone = {
  id: string;
  title: string;
  dueDate: string;
  status: 'Pending' | 'Submitted' | 'In Review' | 'Approved' | 'Paid';
  payout: number;
  submission?: {
    content: string;
    submittedAt: string;
  };
};

export type Message = {
    id: string;
    sender: 'brand' | 'influencer';
    senderName: string;
    text: string;
    timestamp: string;
};

export type Conversation = {
    id: string;
    influencerName: string;
    influencerAvatar: string;
    campaignTitle: string;
    lastMessage: string;
    lastMessageTimestamp: string;
    unreadCount: number;
    messages: Message[];
};
