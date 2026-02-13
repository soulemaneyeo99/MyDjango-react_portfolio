// ========== frontend/src/pages/Contact.jsx ==========
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, ChevronDown, ChevronUp, Github, Linkedin, Globe } from 'lucide-react';
import SEOHead from '../components/common/SEOHead';
import { PERSONAL_INFO } from '../utils/constants';
import { validateEmail, validateRequired } from '../utils/helpers';
import Button from '../components/ui/Button';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!validateRequired(formData.name)) {
      newErrors.name = 'Le nom est requis';
    }

    if (!validateRequired(formData.email)) {
      newErrors.email = 'L\'email est requis';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!validateRequired(formData.subject)) {
      newErrors.subject = 'Le sujet est requis';
    }

    if (!validateRequired(formData.message)) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call - replace with actual API call
      const response = await fetch('https://formspree.io/f/xeoeznnk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: PERSONAL_INFO.social.github, color: 'hover:text-white' },
    { name: 'LinkedIn', icon: Linkedin, url: PERSONAL_INFO.social.linkedin, color: 'hover:text-blue-400' },
    { name: 'Portfolio', icon: Globe, url: '/', color: 'hover:text-primary-500' }
  ];

  const faqs = [
    {
      question: "Quels sont vos tarifs pour un projet ?",
      answer: "Mes tarifs sont établis sur mesure selon l'envergure et la complexité technique. À titre indicatif, un site vitrine professionnel se situe généralement entre 200 000 et 500 000 FCFA, tandis qu'une application métier ou plateforme complexe débute à partir de 800 000 FCFA. Je fournis toujours un devis détaillé et transparent après notre premier échange."
    },
    {
      question: "Combien de temps pour développer un projet ?",
      answer: "Cela dépend de la complexité : un site vitrine prend 1-2 semaines, une application web 1-3 mois. Je fournis toujours un planning détaillé avec des étapes de validation."
    },
    {
      question: "Travaillez-vous avec des clients internationaux ?",
      answer: "Absolument ! Je travaille principalement à distance et j'ai l'habitude de collaborer avec des clients de différents fuseaux horaires. La communication se fait en français ou en anglais."
    },
    {
      question: "Proposez-vous de la maintenance après livraison ?",
      answer: "Oui, je propose des contrats de maintenance pour assurer la sécurité, les mises à jour et les corrections de bugs. C'est essentiel pour maintenir votre site performant."
    }
  ];

  return (
    <>
      <SEOHead
        title="Contact | Souleymane Yeo"
        description="Contactez Souleymane Yeo pour vos projets de développement web. Discutons de vos idées et collaborons ensemble !"
        keywords={['contact', 'collaboration', 'projet', 'développement', 'devis', 'freelance']}
      />

      <div className="min-h-screen bg-bg-dark text-text-primary">
        {/* Hero Section */}
        <section className="pt-24 pb-12 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-1/3 h-full bg-primary-500/5 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-1/3 h-full bg-accent-purple/5 blur-[100px] pointer-events-none" />

          <div className="container-custom relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
              Discutons de votre <span className="text-primary-500">Projet</span>
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed font-light">
              Une idée ? Un besoin spécifique ? Ou simplement envie d'échanger ?<br />
              N'hésitez pas, je réponds avec enthousiasme.
            </p>
          </div>
        </section>

        <section className="py-12 pb-24">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div className="bg-bg-card border border-border-default rounded-2xl p-8 shadow-large order-2 lg:order-1">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="text-primary-500" size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-text-primary">Envoyer un message</h2>
                </div>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-accent-green/10 border border-accent-green/20 rounded-lg flex items-start">
                    <div className="text-accent-green mr-3 mt-0.5">✓</div>
                    <p className="text-accent-green font-medium">Message envoyé avec succès ! Je vous réponds sous 24h.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-accent-red/10 border border-accent-red/20 rounded-lg flex items-start">
                    <div className="text-accent-red mr-3 mt-0.5">✕</div>
                    <p className="text-accent-red font-medium">Erreur lors de l'envoi. Veuillez réessayer ou m'écrire directement.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg bg-bg-elevated border transition-all focus:outline-none ${errors.name
                          ? 'border-accent-red focus:border-accent-red'
                          : 'border-border-default focus:border-primary-500 focus:ring-1 focus:ring-primary-500'
                          } text-text-primary placeholder-text-muted`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="mt-1 text-xs text-accent-red">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg bg-bg-elevated border transition-all focus:outline-none ${errors.email
                          ? 'border-accent-red focus:border-accent-red'
                          : 'border-border-default focus:border-primary-500 focus:ring-1 focus:ring-primary-500'
                          } text-text-primary placeholder-text-muted`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="mt-1 text-xs text-accent-red">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-text-secondary mb-2">
                      Sujet *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg bg-bg-elevated border transition-all focus:outline-none ${errors.subject
                        ? 'border-accent-red focus:border-accent-red'
                        : 'border-border-default focus:border-primary-500 focus:ring-1 focus:ring-primary-500'
                        } text-text-primary placeholder-text-muted`}
                      placeholder="Proposition de projet..."
                    />
                    {errors.subject && <p className="mt-1 text-xs text-accent-red">{errors.subject}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg bg-bg-elevated border transition-all focus:outline-none ${errors.message
                        ? 'border-accent-red focus:border-accent-red'
                        : 'border-border-default focus:border-primary-500 focus:ring-1 focus:ring-primary-500'
                        } text-text-primary placeholder-text-muted resize-none`}
                      placeholder="Bonjour, je souhaiterais discuter d'un projet de..."
                    />
                    {errors.message && <p className="mt-1 text-xs text-accent-red">{errors.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full py-4 text-lg shadow-glow"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Envoi en cours...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Send size={18} className="mr-2" />
                        Envoyer le message
                      </span>
                    )}
                  </Button>
                </form>
              </div>

              {/* Contact Info Side */}
              <div className="space-y-8 order-1 lg:order-2">
                {/* Info Cards */}
                <div className="bg-bg-card border border-border-default rounded-2xl p-8 shadow-soft">
                  <h3 className="text-xl font-bold text-text-primary mb-6">Coordonnées</h3>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-bg-elevated rounded-lg flex items-center justify-center mr-4 text-primary-500">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-text-muted mb-1">Localisation</p>
                        <p className="text-text-primary font-medium">{PERSONAL_INFO.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-bg-elevated rounded-lg flex items-center justify-center mr-4 text-primary-500">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-text-muted mb-1">Email</p>
                        <a href={`mailto:${PERSONAL_INFO.email}`} className="text-text-primary font-medium hover:text-primary-500 transition-colors">
                          {PERSONAL_INFO.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-bg-elevated rounded-lg flex items-center justify-center mr-4 text-primary-500">
                        <Phone size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-text-muted mb-1">Téléphone</p>
                        <a href={`tel:${PERSONAL_INFO.phone}`} className="text-text-primary font-medium hover:text-primary-500 transition-colors">
                          {PERSONAL_INFO.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="mt-8 pt-8 border-t border-border-default">
                    <h4 className="text-sm text-text-muted mb-4">Réseaux Sociaux</h4>
                    <div className="flex space-x-4">
                      {socialLinks.map((social) => {
                        const Icon = social.icon;
                        return (
                          <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-10 h-10 bg-bg-elevated rounded-lg flex items-center justify-center text-text-secondary transition-all hover:bg-bg-dark border border-transparent hover:border-border-default ${social.color}`}
                            title={social.name}
                          >
                            <Icon size={20} />
                          </a>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Response Time Card */}
                <div className="bg-gradient-to-br from-primary-500/10 to-accent-purple/10 border border-primary-500/20 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-text-primary mb-2 flex items-center">
                    <span className="mr-2">⚡</span> Réponse Rapide
                  </h3>
                  <p className="text-sm text-text-secondary mb-4">
                    Je m'efforce de répondre à toutes les demandes sous 24h ouvrées.
                  </p>
                  <div className="flex items-center text-xs font-medium text-accent-green bg-accent-green/10 inline-block px-3 py-1 rounded-full border border-accent-green/20 w-fit">
                    <span className="w-2 h-2 bg-accent-green rounded-full mr-2 animate-pulse"></span>
                    Disponible pour nouveaux projets
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="max-w-3xl mx-auto mt-24">
              <h2 className="text-3xl font-bold text-text-primary text-center mb-12">Questions Fréquentes</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-bg-card border border-border-default rounded-xl overflow-hidden transition-all duration-300 hover:border-primary-500/30">
      <button
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`font-semibold transition-colors ${isOpen ? 'text-primary-500' : 'text-text-primary'}`}>
          {question}
        </span>
        {isOpen ? <ChevronUp size={20} className="text-primary-500" /> : <ChevronDown size={20} className="text-text-muted" />}
      </button>
      <div
        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <p className="text-text-secondary leading-relaxed text-sm">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default Contact;