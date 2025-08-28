const mongoose = require('mongoose');

const screeningSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function() {
      return this.isUserScreening;
    }
  },
  isUserScreening: {
    type: Boolean,
    default: true
  },
  cryptocurrency: {
    coinGeckoId: {
      type: String,
      required: true,
      trim: true
    },
    symbol: {
      type: String,
      required: true,
      uppercase: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    currentPrice: {
      type: Number,
      default: 0
    },
    marketCap: {
      type: Number,
      default: 0
    },
    volume24h: {
      type: Number,
      default: 0
    },
    logoUrl: {
      type: String,
      default: null
    }
  },
  screening: {
    overallRating: {
      type: String,
      enum: ['halal', 'questionable', 'non-halal'],
      required: true
    },
    overallScore: {
      type: Number,
      min: 0,
      max: 100,
      required: true
    },
    confidence: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'medium'
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  criteria: {
    // Pillar 1: Nature & Purpose
    natureAndPurpose: {
      score: {
        type: Number,
        min: 0,
        max: 100,
        required: true
      },
      status: {
        type: String,
        enum: ['compliant', 'questionable', 'non-compliant'],
        required: true
      },
      factors: {
        coreActivity: {
          rating: { type: String, enum: ['compliant', 'questionable', 'non-compliant'] },
          description: String,
          concerns: [String]
        },
        realWorldUtility: {
          rating: { type: String, enum: ['excellent', 'good', 'poor', 'none'] },
          description: String,
          useCase: String
        },
        prohibitedActivities: {
          hasRiba: { type: Boolean, default: false },
          hasGambling: { type: Boolean, default: false },
          hasAlcohol: { type: Boolean, default: false },
          hasAdultContent: { type: Boolean, default: false },
          isSpeculationOnly: { type: Boolean, default: false }
        }
      }
    },
    
    // Pillar 2: Token Structure & Mechanics
    tokenStructure: {
      score: {
        type: Number,
        min: 0,
        max: 100,
        required: true
      },
      status: {
        type: String,
        enum: ['compliant', 'questionable', 'non-compliant'],
        required: true
      },
      factors: {
        ribaAvoidance: {
          rating: { type: String, enum: ['compliant', 'questionable', 'non-compliant'] },
          hasFixedReturns: { type: Boolean, default: false },
          stakingMechanism: String,
          description: String
        },
        ghararAssessment: {
          rating: { type: String, enum: ['low', 'medium', 'high'] },
          contractClarity: String,
          rugPullRisk: String,
          description: String
        },
        speculationLevel: {
          rating: { type: String, enum: ['low', 'medium', 'high'] },
          isMemeCoin: { type: Boolean, default: false },
          hasUtility: { type: Boolean, default: true },
          description: String
        },
        assetBacking: {
          rating: { type: String, enum: ['excellent', 'good', 'poor', 'none'] },
          backingType: String,
          isVerifiable: { type: Boolean, default: false },
          description: String
        }
      }
    },
    
    // Pillar 3: Financial Ratios
    financialRatios: {
      score: {
        type: Number,
        min: 0,
        max: 100,
        required: true
      },
      status: {
        type: String,
        enum: ['compliant', 'questionable', 'non-compliant'],
        required: true
      },
      factors: {
        debtScreening: {
          ratio: { type: Number, min: 0, max: 100 },
          threshold: { type: Number, default: 33 },
          status: { type: String, enum: ['pass', 'fail', 'unknown'] },
          description: String
        },
        cashDeposits: {
          ratio: { type: Number, min: 0, max: 100 },
          threshold: { type: Number, default: 33 },
          status: { type: String, enum: ['pass', 'fail', 'unknown'] },
          description: String
        },
        nonCompliantIncome: {
          ratio: { type: Number, min: 0, max: 100 },
          threshold: { type: Number, default: 5 },
          status: { type: String, enum: ['pass', 'fail', 'unknown'] },
          description: String
        }
      }
    },
    
    // Pillar 4: Governance & Transparency
    governance: {
      score: {
        type: Number,
        min: 0,
        max: 100,
        required: true
      },
      status: {
        type: String,
        enum: ['compliant', 'questionable', 'non-compliant'],
        required: true
      },
      factors: {
        shariahGovernance: {
          rating: { type: String, enum: ['excellent', 'good', 'poor', 'none'] },
          hasShariahBoard: { type: Boolean, default: false },
          hasIslamicAdvisors: { type: Boolean, default: false },
          hasCertification: { type: Boolean, default: false },
          description: String
        },
        transparency: {
          rating: { type: String, enum: ['excellent', 'good', 'poor'] },
          hasWhitepaper: { type: Boolean, default: false },
          hasAudit: { type: Boolean, default: false },
          tokenomicsClarity: String,
          description: String
        },
        decentralization: {
          rating: { type: String, enum: ['high', 'medium', 'low'] },
          governanceModel: String,
          centralizedRisks: String,
          description: String
        }
      }
    }
  },
  analysis: {
    strengths: [String],
    concerns: [String],
    recommendations: [String],
    detailedExplanation: {
      type: String,
      required: true
    },
    sources: [String],
    disclaimer: {
      type: String,
      default: 'This screening is for informational purposes only and should not be considered as financial or religious advice. Please consult with qualified Islamic scholars for specific rulings.'
    }
  },
  metadata: {
    version: {
      type: String,
      default: '1.0'
    },
    processingTime: {
      type: Number, // in milliseconds
      default: 0
    },
    dataSourcesUsed: [String],
    manualReviewRequired: {
      type: Boolean,
      default: false
    },
    reviewNotes: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
screeningSchema.index({ user: 1, createdAt: -1 });
screeningSchema.index({ 'cryptocurrency.coinGeckoId': 1 });
screeningSchema.index({ 'cryptocurrency.symbol': 1 });
screeningSchema.index({ 'screening.overallRating': 1 });
screeningSchema.index({ 'screening.lastUpdated': -1 });

// Virtual for rating emoji
screeningSchema.virtual('ratingEmoji').get(function() {
  switch (this.screening.overallRating) {
    case 'halal':
      return '✅';
    case 'questionable':
      return '⚠️';
    case 'non-halal':
      return '❌';
    default:
      return '❓';
  }
});

// Virtual for rating color
screeningSchema.virtual('ratingColor').get(function() {
  switch (this.screening.overallRating) {
    case 'halal':
      return '#22c55e'; // green
    case 'questionable':
      return '#f59e0b'; // yellow
    case 'non-halal':
      return '#ef4444'; // red
    default:
      return '#6b7280'; // gray
  }
});

// Method to check if screening needs update
screeningSchema.methods.needsUpdate = function() {
  const daysSinceUpdate = (Date.now() - this.screening.lastUpdated) / (1000 * 60 * 60 * 24);
  return daysSinceUpdate > 7; // Update weekly
};

// Static method to get recent screenings
screeningSchema.statics.getRecentScreenings = function(limit = 10) {
  return this.find({ isUserScreening: true })
    .populate('user', 'firstName lastName email')
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('cryptocurrency screening createdAt');
};

// Static method to get screening statistics
screeningSchema.statics.getStatistics = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: '$screening.overallRating',
        count: { $sum: 1 }
      }
    }
  ]);
  
  const total = stats.reduce((sum, stat) => sum + stat.count, 0);
  
  return {
    total,
    halal: stats.find(s => s._id === 'halal')?.count || 0,
    questionable: stats.find(s => s._id === 'questionable')?.count || 0,
    nonHalal: stats.find(s => s._id === 'non-halal')?.count || 0
  };
};

module.exports = mongoose.model('Screening', screeningSchema);