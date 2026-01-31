import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import Badge from '../../ui/Badge';

const TimelineItem = ({ item, index, isLast }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative pl-8 md:pl-0"
        >
            <div className="md:flex md:justify-between md:items-start group">
                {/* Timeline Line & Dot (Desktop center, Mobile left) */}
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border-default md:-ml-[0.5px]">
                    {!isLast && <div className="absolute top-2 bottom-0 w-px bg-border-default"></div>}
                </div>

                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full border-2 border-primary-500 bg-bg-dark -translate-x-1/2 mt-1.5 z-10 group-hover:bg-primary-500 group-hover:scale-125 transition-all duration-300 shadow-glow"></div>

                {/* Content Side Left (Date for Desktop) */}
                <div className="md:w-[45%] md:text-right md:pr-8 mb-2 md:mb-0">
                    <div className="flex items-center md:justify-end text-primary-400 font-mono text-sm mb-1">
                        <Calendar size={14} className="mr-2 md:hidden" />
                        {item.period}
                        <Calendar size={14} className="ml-2 hidden md:block" />
                    </div>
                    <h3 className="text-xl font-bold text-text-primary group-hover:text-primary-500 transition-colors">
                        {item.title}
                    </h3>
                    <p className="text-lg font-medium text-text-secondary">{item.institution || item.organization}</p>
                </div>

                {/* Content Side Right (Details) */}
                <div className="md:w-[45%] md:pl-8 pb-12">
                    {item.location && (
                        <div className="flex items-center text-text-muted text-sm mb-3">
                            <MapPin size={14} className="mr-1" />
                            {item.location}
                        </div>
                    )}

                    <div className="p-5 bg-bg-card border border-border-default rounded-xl shadow-soft group-hover:border-primary-500/30 transition-all duration-300 hover:shadow-glow/20">
                        {item.specialty && (
                            <div className="mb-3">
                                <Badge variant="primary" className="mb-2">{item.specialty}</Badge>
                            </div>
                        )}

                        {item.description && (
                            <p className="text-text-secondary mb-4 text-justify leading-relaxed">
                                {item.description}
                            </p>
                        )}

                        {item.tasks && (
                            <ul className="space-y-2">
                                {item.tasks.map((task, i) => (
                                    <li key={i} className="flex items-start text-text-secondary text-sm">
                                        <span className="text-primary-500 mr-2 mt-1">▹</span>
                                        <span>{task}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Timeline = ({ items, title, icon: Icon }) => {
    return (
        <div className="py-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-text-primary flex items-center justify-center gap-3">
                    {Icon && <Icon className="text-primary-500" size={32} />}
                    {title}
                </h2>
            </div>

            <div className="relative">
                {items.map((item, index) => (
                    <TimelineItem
                        key={index}
                        item={item}
                        index={index}
                        isLast={index === items.length - 1}
                    />
                ))}
            </div>
        </div>
    );
};

export default Timeline;
