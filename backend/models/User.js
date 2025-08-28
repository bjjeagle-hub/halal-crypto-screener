const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String,
    default: null
  },
  passwordResetToken: {
    type: String,
    default: null
  },
  passwordResetExpires: {
    type: Date,
    default: null
  },
  subscription: {
    status: {
      type: String,
      enum: ['free', 'basic', 'premium'],
      default: 'free'
    },
    plan: {
      type: String,
      enum: ['monthly', 'yearly'],
      default: null
    },
    stripeCustomerId: {
      type: String,
      default: null
    },
    stripeSubscriptionId: {
      type: String,
      default: null
    },
    currentPeriodStart: {
      type: Date,
      default: null
    },
    currentPeriodEnd: {
      type: Date,
      default: null
    },
    cancelAtPeriodEnd: {
      type: Boolean,
      default: false
    }
  },
  usage: {
    freeScreeningsUsed: {
      type: Number,
      default: 0,
      max: [process.env.FREE_SCREENINGS_LIMIT || 3, 'Free screenings limit exceeded']
    },
    totalScreenings: {
      type: Number,
      default: 0
    },
    lastScreeningDate: {
      type: Date,
      default: null
    }
  },
  preferences: {
    emailNotifications: {
      type: Boolean,
      default: true
    },
    marketingEmails: {
      type: Boolean,
      default: false
    },
    preferredCurrency: {
      type: String,
      enum: ['usd', 'eur', 'gbp', 'chf'],
      default: 'usd'
    }
  },
  profile: {
    country: {
      type: String,
      maxlength: [100, 'Country name cannot exceed 100 characters']
    },
    timezone: {
      type: String,
      default: 'UTC'
    },
    language: {
      type: String,
      enum: ['en', 'ar', 'fr', 'de'],
      default: 'en'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLoginAt: {
    type: Date,
    default: null
  },
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: {
    type: Date,
    default: null
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
userSchema.index({ email: 1 });
userSchema.index({ 'subscription.stripeCustomerId': 1 });
userSchema.index({ createdAt: -1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual to check if account is locked
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Virtual to check if user can use free screenings
userSchema.virtual('canUseFreeScreenings').get(function() {
  return this.subscription.status === 'free' && 
         this.usage.freeScreeningsUsed < (process.env.FREE_SCREENINGS_LIMIT || 3);
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Hash password with cost of 12
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Increment login attempts
userSchema.methods.incLoginAttempts = function() {
  // Reset attempts if lock has expired
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  
  // Lock account after 5 attempts for 2 hours
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // 2 hours
  }
  
  return this.updateOne(updates);
};

// Reset login attempts
userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 }
  });
};

// Check if user has active subscription
userSchema.methods.hasActiveSubscription = function() {
  return this.subscription.status !== 'free' && 
         this.subscription.currentPeriodEnd > new Date();
};

// Update usage statistics
userSchema.methods.recordScreening = function() {
  const updates = {
    $inc: { 'usage.totalScreenings': 1 },
    $set: { 'usage.lastScreeningDate': new Date() }
  };
  
  if (this.subscription.status === 'free') {
    updates.$inc['usage.freeScreeningsUsed'] = 1;
  }
  
  return this.updateOne(updates);
};

module.exports = mongoose.model('User', userSchema);