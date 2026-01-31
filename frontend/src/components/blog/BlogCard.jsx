// ========== src/components/blog/BlogCard.jsx ==========
import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, User } from 'lucide-react'
import { formatRelativeDate, getMediaUrl } from '../../utils/helpers'

const BlogCard = ({ post, index }) => {
  return (
    <div className="card hover-lift group h-full flex flex-col">
      {post.featured_image && (
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={getMediaUrl(post.featured_image)}
            alt={post.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          {post.category && (
            <span className="badge badge-primary mr-2">
              {post.category.name}
            </span>
          )}
          <div className="flex items-center">
            <Calendar className="mr-1" size={14} />
            <time>{formatRelativeDate(post.created_at)}</time>
          </div>
          {post.reading_time && (
            <>
              <span className="mx-2">•</span>
              <div className="flex items-center">
                <Clock className="mr-1" size={14} />
                <span>{post.reading_time} min</span>
              </div>
            </>
          )}
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors flex-1">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4">
          {post.excerpt}
        </p>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className="badge badge-secondary"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center text-sm text-gray-500">
            <User className="mr-1" size={14} />
            <span>{post.author}</span>
          </div>
          <Link
            to={`/blog/${post.slug}`}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Lire la suite →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogCard