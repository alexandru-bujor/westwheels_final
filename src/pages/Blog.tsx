import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  author: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How to Inspect Salvage Vehicles Before Bidding',
    excerpt: 'Learn the essential steps to evaluate salvage vehicles remotely and make informed bidding decisions.',
    date: '2024-02-10',
    readTime: '8 min read',
    category: 'Buying Guide',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=450&fit=crop',
    author: 'John Smith',
  },
  {
    id: '2',
    title: 'Top 10 Most Popular Salvage Cars in 2024',
    excerpt: 'Discover which salvage vehicles are trending this year and why buyers are rushing to get them.',
    date: '2024-02-08',
    readTime: '6 min read',
    category: 'Trends',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=450&fit=crop',
    author: 'Sarah Johnson',
  },
  {
    id: '3',
    title: 'International Shipping: What You Need to Know',
    excerpt: 'A comprehensive guide to shipping your auction vehicle internationally, including customs and regulations.',
    date: '2024-02-05',
    readTime: '12 min read',
    category: 'Shipping',
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=450&fit=crop',
    author: 'Mike Chen',
  },
  {
    id: '4',
    title: 'Understanding Different Types of Vehicle Damage',
    excerpt: 'From front-end to flood damage, learn how to assess different damage types and their repair costs.',
    date: '2024-02-02',
    readTime: '10 min read',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=450&fit=crop',
    author: 'Emily Davis',
  },
  {
    id: '5',
    title: 'How to Finance Your Salvage Vehicle Purchase',
    excerpt: 'Explore financing options available for salvage vehicle buyers and find the best rates.',
    date: '2024-01-28',
    readTime: '7 min read',
    category: 'Finance',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=450&fit=crop',
    author: 'Robert Wilson',
  },
  {
    id: '6',
    title: 'The Future of Electric Vehicle Salvage Market',
    excerpt: 'How EVs are changing the salvage industry and what opportunities await for buyers.',
    date: '2024-01-25',
    readTime: '9 min read',
    category: 'Industry News',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=450&fit=crop',
    author: 'Lisa Anderson',
  },
];

const Blog = () => {
  const { t } = useTranslation();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-8 lg:pt-28 lg:pb-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              {t('nav.blog')}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Expert insights, tips, and news from the world of vehicle auctions
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          {/* Featured Post */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <Link to={`/blog/${blogPosts[0].id}`} className="group">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-card rounded-2xl overflow-hidden border border-border hover:shadow-elevated transition-shadow">
                <div className="aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden">
                  <img
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 lg:p-8 flex flex-col justify-center">
                  <Badge variant="secondary" className="w-fit mb-4">
                    {blogPosts[0].category}
                  </Badge>
                  <h2 className="font-display font-bold text-2xl lg:text-3xl text-foreground mb-4 group-hover:text-primary transition-colors">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{blogPosts[0].author}</span>
                    </div>
                    <span>•</span>
                    <span>{formatDate(blogPosts[0].date)}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(1).map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
              >
                <Link to={`/blog/${post.id}`} className="group">
                  <div className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <Badge variant="secondary" className="w-fit mb-3">
                        {post.category}
                      </Badge>
                      <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{formatDate(post.date)}</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
