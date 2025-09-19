'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'pt' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Load saved language from localStorage or detect browser language
    const savedLanguage = localStorage.getItem('lumalima-language') as Language;
    if (savedLanguage && ['en', 'pt', 'de'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    } else {
      // Auto-detect browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('pt')) {
        setLanguageState('pt');
      } else if (browserLang.startsWith('de')) {
        setLanguageState('de');
      } else {
        setLanguageState('en');
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    console.log('LanguageContext: setLanguage called with:', lang);
    console.log('LanguageContext: Current language before change:', language);
    
    setLanguageState(lang);
    localStorage.setItem('lumalima-language', lang);
    
    console.log('LanguageContext: Language saved to localStorage:', localStorage.getItem('lumalima-language'));
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Translation data
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    
    // Home page
    'home.title': 'Illumination Solutions',
    'home.subtitle': 'Professional lighting design for every space and occasion',
    'home.loading': 'Loading illumination...',
    
    // Categories
    'category.housing': 'Housing',
    'category.comercial': 'Commercial',
    'category.public': 'Public',
    'category.urban': 'Urban',
    
    // About page
    'about.title': 'Light Architecture with Real Support',
    'about.subtitle': 'At Lumalima we transform projects into experiences. Lighting is not just technical. It provides comfort, identity and life to every space.',
    'about.description1': 'What distinguishes us is simple. We are architects specialized in lighting and we follow every step through to construction. We don\'t stop at concept. Every calculation, every detail and every installation is designed and executed so the final result corresponds exactly to what was projected.',
    'about.description2': 'We work together with engineers and the entire execution team. We develop the necessary drawings and closely monitor the on-site execution. We are present to ensure every decision is implemented as planned.',
    'about.description3': 'Our role is to coordinate and simplify. By choosing Lumalima, you have a partner who speaks the language of the entire technical and execution team and ensures that lighting stops being an extra to become a natural part of the architecture.',
    'about.description4': 'The result is clear: lighting solutions that unite beauty, efficiency and trust. Because lighting is not just what you see. It\'s what you feel every day.',
    
    // Team section
    'about.team.title': 'Meet Our Team',
    
    // Raquel Contente
    'about.raquel.role': 'Architect specialized in Lighting and Execution Projects',
    'about.raquel.intro': 'I am an architect with a passion for creating spaces that breathe, where light is intentional and every detail has meaning.',
    'about.raquel.experience': 'I discovered in practice that light is the invisible key to comfort. That\'s why I dedicate myself to integrating lighting in all project phases, from concept to final installation.',
    'about.raquel.approach': 'My differential is being present on site, side by side with clients, architects and contractors. This way I ensure the project doesn\'t stay on paper, but transforms into a reality lived every day.',
    'about.raquel.quote1': 'For me, lighting is not just what you see.',
    'about.raquel.quote2': 'It\'s what you feel.',
    'about.raquel.booking': 'Schedule a Consultation',
    
    // Christian Nascimento
    'about.christian.role': 'Lighting Designer and Acoustics Consultant, Technical Team Coordinator',
    'about.christian.intro': 'With over 15 years of experience and more than 400 completed projects, Christian brings technical rigor and global vision to every Lumalima project.',
    'about.christian.experience': 'He is a professor in postgraduate programs and MBAs, speaker at international events and has impacted over 7,000 people through his lighting training.',
    'about.christian.achievements': 'At Lumalima, Christian coordinates the technical team and ensures every project has a solid foundation that guarantees longevity, efficiency and excellence.',
    'about.christian.teaching': '',
    'about.christian.quote': 'He believes that caring for light and sound is caring for people\'s well-being in the spaces where they live and work.',
    
    // Services page
    'services.title': 'Our Services',
    'services.subtitle': 'Comprehensive illumination solutions from concept to completion',
    'services.design': 'Lighting Design',
    'services.design.desc': 'Custom lighting solutions tailored to your space and needs',
    'services.consultation': 'Consultation',
    'services.consultation.desc': 'Expert advice on lighting strategy and implementation',
    'services.installation': 'Installation',
    'services.installation.desc': 'Professional installation and setup of lighting systems',
    'services.maintenance': 'Maintenance',
    'services.maintenance.desc': 'Ongoing support and maintenance for optimal performance',
    'services.cta': 'Get in Touch',
    
    // Contact page
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Let\'s discuss your illumination project',
    'contact.offices': 'Our Offices',
    'contact.switzerland': 'Switzerland',
    'contact.portugal': 'Portugal',
    'contact.location': 'Location',
    'contact.getInTouch': 'Get in Touch',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.address': 'Address',
    'contact.generalInfo': 'General Information',
    'contact.generalInfo.desc': 'For general inquiries and project discussions, reach out to us at info@lumalima.com',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.projectType': 'Project Type',
    'contact.form.selectCategory': 'Select a category',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.form.success': 'Thank you! Your message has been sent successfully. We will get back to you soon.',
    'contact.form.error': 'Sorry, there was an error sending your message. Please try again or contact us directly.',
    
    // Confirmation email
    'email.confirmation.subject': 'Message Received - Lumalima',
    'email.confirmation.greeting': 'Dear',
    'email.confirmation.body1': 'Thank you for contacting Lumalima. We have received your message and will get back to you within 24-48 hours.',
    'email.confirmation.body2': 'Here is a copy of your message:',
    'email.confirmation.projectType': 'Project Type',
    'email.confirmation.message': 'Message',
    'email.confirmation.footer': 'Best regards,<br>The Lumalima Team',
    'email.confirmation.website': 'Visit our website',
    
    // Category pages
    'housing.title': 'Housing',
    'housing.subtitle': 'Intimate lighting solutions for private residences and personal spaces',
    'housing.description': 'Transform your home into a sanctuary of light and comfort with our private lighting solutions.',
    'housing.residential': 'Residential',
    'housing.residential.desc': 'Complete home lighting design',
    'housing.gardens': 'Gardens',
    'housing.gardens.desc': 'Outdoor and landscape illumination',
    'housing.events': 'Events',
    'housing.events.desc': 'Private celebrations and gatherings',
    
    'comercial.title': 'Commercial',
    'comercial.subtitle': 'Professional lighting solutions that enhance business environments and customer experiences',
    'comercial.description': 'Create inspiring commercial spaces that drive engagement and reflect your brand identity.',
    'comercial.retail': 'Retail',
    'comercial.retail.desc': 'Store and showroom lighting design',
    'comercial.offices': 'Offices',
    'comercial.offices.desc': 'Productive workplace illumination',
    'comercial.hospitality': 'Hospitality',
    'comercial.hospitality.desc': 'Hotels, restaurants, and venues',
    
    'public.title': 'Public',
    'public.subtitle': 'Illumination solutions for public spaces that serve communities and enhance civic life',
    'public.description': 'Design lighting that brings communities together and creates safe, welcoming public environments.',
    'public.museums': 'Museums',
    'public.museums.desc': 'Cultural and exhibition spaces',
    'public.libraries': 'Libraries',
    'public.libraries.desc': 'Educational and community centers',
    'public.parks': 'Parks',
    'public.parks.desc': 'Public recreational areas',
    
    'urban.title': 'Urban',
    'urban.subtitle': 'Large-scale urban lighting solutions that shape city landscapes and improve quality of life',
    'urban.description': 'Transform urban environments with intelligent lighting systems that enhance safety, sustainability, and beauty.',
    'urban.streets': 'Streets',
    'urban.streets.desc': 'Smart street lighting systems',
    'urban.bridges': 'Bridges',
    'urban.bridges.desc': 'Architectural and safety lighting',
    'urban.plazas': 'Plazas',
    'urban.plazas.desc': 'Public gathering spaces',
    
    // Preloader
    'preloader.loading': 'images loaded',
    
    // Footer
    'footer.description': 'Professional illumination design that transforms spaces and enhances experiences through innovative lighting solutions.',
    'footer.email': 'Email',
    'footer.phone': 'Phone',
    'footer.switzerland': 'Switzerland',
    'footer.portugal': 'Portugal',
    'footer.quickLinks': 'Quick Links',
    'footer.company': 'Company',
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
  },
  
  pt: {
    // Navigation
    'nav.about': 'Sobre',
    'nav.services': 'Serviços',
    'nav.contact': 'Contacto',
    
    // Home page
    'home.title': 'Soluções de Iluminação',
    'home.subtitle': 'Design de iluminação profissional para cada espaço e ocasião',
    'home.loading': 'A carregar iluminação...',
    
    // Categories
    'category.housing': 'Habitação',
    'category.comercial': 'Comercial',
    'category.public': 'Público',
    'category.urban': 'Urbano',
    
    // About page
    'about.title': 'Sobre a Lumalima',
    'about.subtitle': 'Criando experiências de iluminação extraordinárias que transformam espaços e inspiram emoções.',
    'about.description1': 'A Lumalima é um atelier de iluminação de excelência dedicado a criar soluções de iluminação excepcionais que realçam espaços arquitetónicos e transformam ambientes.',
    'about.description2': 'A nossa experiência abrange residências privadas, espaços comerciais, locais públicos e paisagens urbanas. Acreditamos que a luz não é apenas funcional—é uma forma de arte que molda experiências, influencia humores e define o carácter de qualquer espaço.',
    'about.description3': 'Com um compromisso com a inovação e sustentabilidade, trabalhamos estreitamente com arquitetos, designers e clientes para entregar soluções de iluminação personalizadas que excedem expectativas e resistem ao teste do tempo.',
    
    // Team section
    'about.team.title': 'Conheça a Nossa Equipa',
    
    // Raquel Contente
    'about.raquel.role': 'Arquiteta especializada em Iluminação e Projeto de Execução',
    'about.raquel.intro': 'Sou arquiteta com paixão por criar espaços que respiram, onde a luz é intencional e cada detalhe tem significado.',
    'about.raquel.experience': 'Descobri na prática que a luz é a chave invisível do conforto. Por isso, dedico-me a integrar a iluminação em todas as fases do projeto, desde o conceito até à instalação final.',
    'about.raquel.approach': 'O meu diferencial é estar presente em obra, lado a lado com clientes, arquitetos e empreiteiros. Assim garanto que o projeto não fica no papel, mas se transforma numa realidade vivida todos os dias.',
    'about.raquel.quote1': 'Para mim, iluminação não é apenas o que se vê.',
    'about.raquel.quote2': 'É o que se sente.',
    'about.raquel.booking': 'Agendar uma Consulta',
    
    // Christian Nascimento
    'about.christian.role': 'Designer de Iluminação e Consultor de Acústica, Coordenador da Equipa Técnica',
    'about.christian.intro': 'Com mais de 15 anos de experiência e mais de 400 projetos concluídos, Christian traz rigor técnico e visão global a cada projeto da Lumalima.',
    'about.christian.experience': 'É professor em pós-graduações e MBAs, orador em eventos internacionais e já impactou mais de 7.000 pessoas através da sua formação em iluminação.',
    'about.christian.achievements': 'Na Lumalima, Christian coordena a equipa técnica e assegura que cada projeto tem uma base sólida que garante longevidade, eficiência e excelência.',
    'about.christian.teaching': '',
    'about.christian.quote': 'Acredita que cuidar da luz e do som é cuidar do bem-estar das pessoas nos espaços onde vivem e trabalham.',
    
    // Services page
    'services.title': 'Os Nossos Serviços',
    'services.subtitle': 'Soluções de iluminação abrangentes do conceito à conclusão',
    'services.design': 'Design de Iluminação',
    'services.design.desc': 'Soluções de iluminação personalizadas adaptadas ao seu espaço e necessidades',
    'services.consultation': 'Consultoria',
    'services.consultation.desc': 'Aconselhamento especializado sobre estratégia e implementação de iluminação',
    'services.installation': 'Instalação',
    'services.installation.desc': 'Instalação e configuração profissional de sistemas de iluminação',
    'services.maintenance': 'Manutenção',
    'services.maintenance.desc': 'Suporte contínuo e manutenção para desempenho ótimo',
    'services.cta': 'Entre em Contacto',
    
    // Contact page
    'contact.title': 'Contacte-nos',
    'contact.subtitle': 'Vamos discutir o seu projeto de iluminação',
    'contact.offices': 'Os Nossos Escritórios',
    'contact.switzerland': 'Suíça',
    'contact.portugal': 'Portugal',
    'contact.location': 'Localização',
    'contact.getInTouch': 'Entre em Contacto',
    'contact.email': 'Email',
    'contact.phone': 'Telefone',
    'contact.address': 'Endereço',
    'contact.generalInfo': 'Informações Gerais',
    'contact.generalInfo.desc': 'Para perguntas gerais e discussões de projetos, contacte-nos em info@lumalima.com',
    'contact.form.name': 'Nome',
    'contact.form.email': 'Email',
    'contact.form.projectType': 'Tipo de Projeto',
    'contact.form.selectCategory': 'Selecione uma categoria',
    'contact.form.message': 'Mensagem',
    'contact.form.send': 'Enviar Mensagem',
    'contact.form.sending': 'A enviar...',
    'contact.form.success': 'Obrigado! A sua mensagem foi enviada com sucesso. Entraremos em contacto em breve.',
    'contact.form.error': 'Desculpe, ocorreu um erro ao enviar a sua mensagem. Tente novamente ou contacte-nos diretamente.',
    
    // Confirmation email
    'email.confirmation.subject': 'Mensagem Recebida - Lumalima',
    'email.confirmation.greeting': 'Caro',
    'email.confirmation.body1': 'Obrigado por contactar a Lumalima. Recebemos a sua mensagem e entraremos em contacto dentro de 24-48 horas.',
    'email.confirmation.body2': 'Aqui está uma cópia da sua mensagem:',
    'email.confirmation.projectType': 'Tipo de Projeto',
    'email.confirmation.message': 'Mensagem',
    'email.confirmation.footer': 'Melhores cumprimentos,<br>A Equipa Lumalima',
    'email.confirmation.website': 'Visite o nosso website',
    
    // Category pages
    'housing.title': 'Habitação',
    'housing.subtitle': 'Soluções de iluminação íntimas para residências privadas e espaços pessoais',
    'housing.description': 'Transforme a sua casa num santuário de luz e conforto com as nossas soluções de iluminação privada.',
    'housing.residential': 'Residencial',
    'housing.residential.desc': 'Design completo de iluminação doméstica',
    'housing.gardens': 'Jardins',
    'housing.gardens.desc': 'Iluminação exterior e paisagística',
    'housing.events': 'Eventos',
    'housing.events.desc': 'Celebrações e encontros privados',
    
    'comercial.title': 'Comercial',
    'comercial.subtitle': 'Soluções de iluminação profissionais que melhoram ambientes empresariais e experiências de clientes',
    'comercial.description': 'Crie espaços comerciais inspiradores que impulsionam o envolvimento e refletem a identidade da sua marca.',
    'comercial.retail': 'Retalho',
    'comercial.retail.desc': 'Design de iluminação para lojas e showrooms',
    'comercial.offices': 'Escritórios',
    'comercial.offices.desc': 'Iluminação produtiva para locais de trabalho',
    'comercial.hospitality': 'Hospitalidade',
    'comercial.hospitality.desc': 'Hotéis, restaurantes e locais',
    
    'public.title': 'Público',
    'public.subtitle': 'Soluções de iluminação para espaços públicos que servem comunidades e melhoram a vida cívica',
    'public.description': 'Projete iluminação que une comunidades e cria ambientes públicos seguros e acolhedores.',
    'public.museums': 'Museus',
    'public.museums.desc': 'Espaços culturais e de exposição',
    'public.libraries': 'Bibliotecas',
    'public.libraries.desc': 'Centros educacionais e comunitários',
    'public.parks': 'Parques',
    'public.parks.desc': 'Áreas recreativas públicas',
    
    'urban.title': 'Urbano',
    'urban.subtitle': 'Soluções de iluminação urbana em grande escala que moldam paisagens citadinas e melhoram a qualidade de vida',
    'urban.description': 'Transforme ambientes urbanos com sistemas de iluminação inteligentes que aumentam a segurança, sustentabilidade e beleza.',
    'urban.streets': 'Ruas',
    'urban.streets.desc': 'Sistemas inteligentes de iluminação pública',
    'urban.bridges': 'Pontes',
    'urban.bridges.desc': 'Iluminação arquitetónica e de segurança',
    'urban.plazas': 'Praças',
    'urban.plazas.desc': 'Espaços públicos de encontro',
    
    // Preloader
    'preloader.loading': 'imagens carregadas',
    
    // Footer
    'footer.description': 'Design de iluminação profissional que transforma espaços e melhora experiências através de soluções de iluminação inovadoras.',
    'footer.email': 'Email',
    'footer.phone': 'Telefone',
    'footer.switzerland': 'Suíça',
    'footer.portugal': 'Portugal',
    'footer.quickLinks': 'Links Rápidos',
    'footer.company': 'Empresa',
    'footer.rights': 'Todos os direitos reservados.',
    'footer.privacy': 'Política de Privacidade',
    'footer.terms': 'Termos de Serviço',
  },
  
  de: {
    // Navigation
    'nav.about': 'Über uns',
    'nav.services': 'Dienstleistungen',
    'nav.contact': 'Kontakt',
    
    // Home page
    'home.title': 'Beleuchtungslösungen',
    'home.subtitle': 'Professionelles Lichtdesign für jeden Raum und jeden Anlass',
    'home.loading': 'Beleuchtung wird geladen...',
    
    // Categories
    'category.housing': 'Wohnen',
    'category.comercial': 'Gewerbe',
    'category.public': 'Öffentlich',
    'category.urban': 'Urban',
    
    // About page
    'about.title': 'Lichtarchitektur mit echter Begleitung',
    'about.subtitle': 'Bei Lumalima verwandeln wir Projekte in Erfahrungen. Beleuchtung ist nicht nur Technik. Sie verleiht jedem Raum Komfort, Identität und Leben.',
    'about.description1': 'Was uns auszeichnet ist einfach. Wir sind auf Beleuchtung spezialisierte Architekten und begleiten jeden Schritt bis zur Baustelle. Wir bleiben nicht beim Konzept stehen. Jede Berechnung, jedes Detail und jede Installation wird durchdacht und ausgeführt, damit das Endergebnis genau dem entspricht, was geplant wurde.',
    'about.description2': 'Wir arbeiten gemeinsam mit Ingenieuren und dem gesamten Ausführungsteam. Wir entwickeln die notwendigen Zeichnungen und überwachen die Ausführung auf der Baustelle eng. Wir sind präsent, damit jede Entscheidung wie geplant umgesetzt wird.',
    'about.description3': 'Unsere Rolle ist es zu koordinieren und zu vereinfachen. Wenn Sie Lumalima wählen, haben Sie einen Partner, der die Sprache des gesamten technischen und Ausführungsteams spricht und dafür sorgt, dass Beleuchtung aufhört ein Extra zu sein und zu einem natürlichen Teil der Architektur wird.',
    'about.description4': 'Das Ergebnis ist klar: Lichtlösungen, die Schönheit, Effizienz und Vertrauen vereinen. Denn Beleuchtung ist nicht nur das, was man sieht. Es ist das, was man jeden Tag fühlt.',
    
    // Team section
    'about.team.title': 'Lernen Sie Unser Team Kennen',
    
    // Raquel Contente
    'about.raquel.role': 'Architektin spezialisiert auf Beleuchtung und Ausführungsprojekte',
    'about.raquel.intro': 'Ich bin Architektin mit einer Leidenschaft für Räume, die atmen, wo Licht intentional ist und jedes Detail Bedeutung hat.',
    'about.raquel.experience': 'Ich entdeckte in der Praxis, dass Licht der unsichtbare Schlüssel zum Komfort ist. Deshalb widme ich mich der Integration von Beleuchtung in allen Projektphasen, vom Konzept bis zur finalen Installation.',
    'about.raquel.approach': 'Mein Unterschied ist, auf der Baustelle präsent zu sein, Seite an Seite mit Kunden, Architekten und Bauunternehmern. So stelle ich sicher, dass das Projekt nicht auf dem Papier bleibt, sondern sich in eine täglich gelebte Realität verwandelt.',
    'about.raquel.quote1': 'Für mich ist Beleuchtung nicht nur das, was man sieht.',
    'about.raquel.quote2': 'Es ist das, was man fühlt.',
    'about.raquel.booking': 'Beratung Vereinbaren',
    
    // Christian Nascimento
    'about.christian.role': 'Lichtdesigner und Akustikberater, Koordinator des technischen Teams',
    'about.christian.intro': 'Mit über 15 Jahren Erfahrung und mehr als 400 abgeschlossenen Projekten bringt Christian technische Präzision und globale Vision in jedes Lumalima-Projekt.',
    'about.christian.experience': 'Er ist Professor in Postgraduierten- und MBA-Programmen, Sprecher bei internationalen Veranstaltungen und hat bereits über 7.000 Menschen durch seine Beleuchtungsausbildung beeinflusst.',
    'about.christian.achievements': 'Bei Lumalima koordiniert Christian das technische Team und stellt sicher, dass jedes Projekt eine solide Grundlage hat, die Langlebigkeit, Effizienz und Exzellenz gewährleistet.',
    'about.christian.teaching': '',
    'about.christian.quote': 'Er glaubt, dass die Pflege von Licht und Klang die Pflege des Wohlbefindens der Menschen in den Räumen ist, in denen sie leben und arbeiten.',
    
    // Services page
    'services.title': 'Unsere Dienstleistungen',
    'services.subtitle': 'Umfassende Beleuchtungslösungen vom Konzept bis zur Fertigstellung',
    'services.design': 'Lichtdesign',
    'services.design.desc': 'Maßgeschneiderte Beleuchtungslösungen für Ihren Raum und Ihre Bedürfnisse',
    'services.consultation': 'Beratung',
    'services.consultation.desc': 'Expertenberatung zu Beleuchtungsstrategie und -implementierung',
    'services.installation': 'Installation',
    'services.installation.desc': 'Professionelle Installation und Einrichtung von Beleuchtungssystemen',
    'services.maintenance': 'Wartung',
    'services.maintenance.desc': 'Kontinuierliche Unterstützung und Wartung für optimale Leistung',
    'services.cta': 'Kontakt aufnehmen',
    
    // Contact page
    'contact.title': 'Kontaktieren Sie uns',
    'contact.subtitle': 'Lassen Sie uns über Ihr Beleuchtungsprojekt sprechen',
    'contact.offices': 'Unsere Büros',
    'contact.switzerland': 'Schweiz',
    'contact.portugal': 'Portugal',
    'contact.location': 'Standort',
    'contact.getInTouch': 'Kontakt aufnehmen',
    'contact.email': 'E-Mail',
    'contact.phone': 'Telefon',
    'contact.address': 'Adresse',
    'contact.generalInfo': 'Allgemeine Informationen',
    'contact.generalInfo.desc': 'Für allgemeine Anfragen und Projektdiskussionen kontaktieren Sie uns unter info@lumalima.com',
    'contact.form.name': 'Name',
    'contact.form.email': 'E-Mail',
    'contact.form.projectType': 'Projekttyp',
    'contact.form.selectCategory': 'Kategorie auswählen',
    'contact.form.message': 'Nachricht',
    'contact.form.send': 'Nachricht senden',
    'contact.form.sending': 'Wird gesendet...',
    'contact.form.success': 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Wir werden uns bald bei Ihnen melden.',
    'contact.form.error': 'Entschuldigung, beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.',
    
    // Confirmation email
    'email.confirmation.subject': 'Nachricht Erhalten - Lumalima',
    'email.confirmation.greeting': 'Liebe(r)',
    'email.confirmation.body1': 'Vielen Dank, dass Sie Lumalima kontaktiert haben. Wir haben Ihre Nachricht erhalten und werden uns innerhalb von 24-48 Stunden bei Ihnen melden.',
    'email.confirmation.body2': 'Hier ist eine Kopie Ihrer Nachricht:',
    'email.confirmation.projectType': 'Projekttyp',
    'email.confirmation.message': 'Nachricht',
    'email.confirmation.footer': 'Mit freundlichen Grüßen,<br>Das Lumalima Team',
    'email.confirmation.website': 'Besuchen Sie unsere Website',
    
    // Category pages
    'housing.title': 'Wohnen',
    'housing.subtitle': 'Intime Beleuchtungslösungen für private Wohnhäuser und persönliche Räume',
    'housing.description': 'Verwandeln Sie Ihr Zuhause in ein Heiligtum aus Licht und Komfort mit unseren privaten Beleuchtungslösungen.',
    'housing.residential': 'Wohnbereich',
    'housing.residential.desc': 'Komplettes Wohnbeleuchtungsdesign',
    'housing.gardens': 'Gärten',
    'housing.gardens.desc': 'Außen- und Landschaftsbeleuchtung',
    'housing.events': 'Veranstaltungen',
    'housing.events.desc': 'Private Feiern und Zusammenkünfte',
    
    'comercial.title': 'Gewerbe',
    'comercial.subtitle': 'Professionelle Beleuchtungslösungen, die Geschäftsumgebungen und Kundenerfahrungen verbessern',
    'comercial.description': 'Schaffen Sie inspirierende Gewerberäume, die Engagement fördern und Ihre Markenidentität widerspiegeln.',
    'comercial.retail': 'Einzelhandel',
    'comercial.retail.desc': 'Geschäfts- und Ausstellungsraumbeleuchtung',
    'comercial.offices': 'Büros',
    'comercial.offices.desc': 'Produktive Arbeitsplatzbeleuchtung',
    'comercial.hospitality': 'Gastgewerbe',
    'comercial.hospitality.desc': 'Hotels, Restaurants und Veranstaltungsorte',
    
    'public.title': 'Öffentlich',
    'public.subtitle': 'Beleuchtungslösungen für öffentliche Räume, die Gemeinden dienen und das Bürgerleben verbessern',
    'public.description': 'Entwerfen Sie Beleuchtung, die Gemeinden zusammenbringt und sichere, einladende öffentliche Umgebungen schafft.',
    'public.museums': 'Museen',
    'public.museums.desc': 'Kultur- und Ausstellungsräume',
    'public.libraries': 'Bibliotheken',
    'public.libraries.desc': 'Bildungs- und Gemeindezentren',
    'public.parks': 'Parks',
    'public.parks.desc': 'Öffentliche Erholungsgebiete',
    
    'urban.title': 'Urban',
    'urban.subtitle': 'Großflächige urbane Beleuchtungslösungen, die Stadtlandschaften prägen und die Lebensqualität verbessern',
    'urban.description': 'Transformieren Sie städtische Umgebungen mit intelligenten Beleuchtungssystemen, die Sicherheit, Nachhaltigkeit und Schönheit fördern.',
    'urban.streets': 'Straßen',
    'urban.streets.desc': 'Intelligente Straßenbeleuchtungssysteme',
    'urban.bridges': 'Brücken',
    'urban.bridges.desc': 'Architektonische und Sicherheitsbeleuchtung',
    'urban.plazas': 'Plätze',
    'urban.plazas.desc': 'Öffentliche Versammlungsräume',
    
    // Preloader
    'preloader.loading': 'Bilder geladen',
    
    // Footer
    'footer.description': 'Professionelles Beleuchtungsdesign, das Räume transformiert und Erfahrungen durch innovative Beleuchtungslösungen verbessert.',
    'footer.email': 'E-Mail',
    'footer.phone': 'Telefon',
    'footer.switzerland': 'Schweiz',
    'footer.portugal': 'Portugal',
    'footer.quickLinks': 'Schnelle Links',
    'footer.company': 'Unternehmen',
    'footer.rights': 'Alle Rechte vorbehalten.',
    'footer.privacy': 'Datenschutzrichtlinie',
    'footer.terms': 'Nutzungsbedingungen',
  },
};