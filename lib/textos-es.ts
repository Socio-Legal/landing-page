/**
 * Textos de la web en castellano (public/locales/es), por namespace de i18next.
 * Solo lo importa el proveedor de ese idioma (components/providers-es.tsx),
 * así que cada página descarga los textos de su idioma y no los de los dos.
 */
import common from "@/public/locales/es/common.json";
import cookieConsent from "@/public/locales/es/cookie-consent.json";
import homeClientsSection from "@/public/locales/es/home-clients-section.json";
import homeCtaSection from "@/public/locales/es/home-cta-section.json";
import homeFeaturesSection from "@/public/locales/es/home-features-section.json";
import homeHeroSection from "@/public/locales/es/home-hero-section.json";
import homePricingSection from "@/public/locales/es/home-pricing-section.json";
import homeProductsSection from "@/public/locales/es/home-products-section.json";
import homeTestimonialsSection from "@/public/locales/es/home-testimonials-section.json";
import homeUsesSection from "@/public/locales/es/home-uses-section.json";
import homeNumbersSection from "@/public/locales/es/home-numbers-section.json";
import homeFlowsSection from "@/public/locales/es/home-flows-section.json";
import homeJuntaSection from "@/public/locales/es/home-junta-section.json";
import homeIntegrationsSection from "@/public/locales/es/home-integrations-section.json";
import homePricingAnchor from "@/public/locales/es/home-pricing-anchor.json";
import productHeroSection from "@/public/locales/es/product-hero-section.json";
import productPartnerBookPage from "@/public/locales/es/product-partner-book-page.json";
import productIncentivePlansPage from "@/public/locales/es/product-incentive-plans-page.json";
import productShareholderMeetingsPage from "@/public/locales/es/product-shareholder-meetings-page.json";
import productCommunicationsSignaturesPage from "@/public/locales/es/product-communications-signatures-page.json";
import productOperationDraftsPage from "@/public/locales/es/product-operation-drafts-page.json";
import productSecondaryMarketPage from "@/public/locales/es/product-secondary-market-page.json";
import solutionsCompaniesPage from "@/public/locales/es/solutions-companies-page.json";
import solutionsLawyersPage from "@/public/locales/es/solutions-lawyers-page.json";
import solutionsStartupsPage from "@/public/locales/es/solutions-startups-page.json";
import solutionsInvestorsPage from "@/public/locales/es/solutions-investors-page.json";
import solutionsInvestorsDashboardPage from "@/public/locales/es/solutions-investors-dashboard-page.json";
import testimonialsPage from "@/public/locales/es/testimonials-page.json";
import testimonialsFactorialPage from "@/public/locales/es/testimonials-factorial-page.json";
import testimonialsCaballeroPage from "@/public/locales/es/testimonials-caballero-page.json";
import testimonialsPldspacePage from "@/public/locales/es/testimonials-pldspace-page.json";
import testimonialsTaxdownPage from "@/public/locales/es/testimonials-taxdown-page.json";
import testimonialsMyInvestorPage from "@/public/locales/es/testimonials-myinvestor-page.json";
import testimonialsAxaPage from "@/public/locales/es/testimonials-axa-page.json";
import testimonialsOsbornePage from "@/public/locales/es/testimonials-osborne-page.json";
import testimonialsFanalcaPage from "@/public/locales/es/testimonials-fanalca-page.json";
import testimonialsMultiversePage from "@/public/locales/es/testimonials-multiverse-page.json";
import testimonialsSadePage from "@/public/locales/es/testimonials-sade-page.json";
import pricingPage from "@/public/locales/es/pricing-page.json";
import resourcesGlossary from "@/public/locales/es/resources-glossary.json";
import aboutPage from "@/public/locales/es/about-page.json";
import sttokVsExcelPage from "@/public/locales/es/sttok-vs-excel-page.json";
import legalDisclaimerPage from "@/public/locales/es/legal-disclaimer-page.json";
import legalSecurityPage from "@/public/locales/es/legal-security-page.json";
import legalPrivacyPage from "@/public/locales/es/legal-privacy-page.json";

const TEXTOS = {
  common,
  "cookie-consent": cookieConsent,
  "home-clients-section": homeClientsSection,
  "home-cta-section": homeCtaSection,
  "home-features-section": homeFeaturesSection,
  "home-hero-section": homeHeroSection,
  "home-pricing-section": homePricingSection,
  "home-products-section": homeProductsSection,
  "home-testimonials-section": homeTestimonialsSection,
  "home-uses-section": homeUsesSection,
  "home-numbers-section": homeNumbersSection,
  "home-flows-section": homeFlowsSection,
  "home-junta-section": homeJuntaSection,
  "home-integrations-section": homeIntegrationsSection,
  "home-pricing-anchor": homePricingAnchor,

  "product-hero-section": productHeroSection,
  "product-partner-book-page": productPartnerBookPage,
  "product-incentive-plans-page": productIncentivePlansPage,
  "product-shareholder-meetings-page": productShareholderMeetingsPage,
  "product-communications-signatures-page": productCommunicationsSignaturesPage,
  "product-operation-drafts-page": productOperationDraftsPage,
  "product-secondary-market-page": productSecondaryMarketPage,

  "solutions-companies-page": solutionsCompaniesPage,
  "solutions-lawyers-page": solutionsLawyersPage,
  "solutions-startups-page": solutionsStartupsPage,
  "solutions-investors-page": solutionsInvestorsPage,
  "solutions-investors-dashboard-page": solutionsInvestorsDashboardPage,

  "testimonials-page": testimonialsPage,
  "testimonials-factorial-page": testimonialsFactorialPage,
  "testimonials-caballero-page": testimonialsCaballeroPage,
  "testimonials-pldspace-page": testimonialsPldspacePage,
  "testimonials-taxdown-page": testimonialsTaxdownPage,
  "testimonials-myinvestor-page": testimonialsMyInvestorPage,
  "testimonials-axa-page": testimonialsAxaPage,
  "testimonials-osborne-page": testimonialsOsbornePage,
  "testimonials-fanalca-page": testimonialsFanalcaPage,
  "testimonials-multiverse-page": testimonialsMultiversePage,
  "testimonials-sade-page": testimonialsSadePage,

  "pricing-page": pricingPage,
  "resources-glossary": resourcesGlossary,
  "about-page": aboutPage,
  "sttok-vs-excel-page": sttokVsExcelPage,

  "legal-privacy-page": legalPrivacyPage,
  "legal-security-page": legalSecurityPage,
  "legal-disclaimer-page": legalDisclaimerPage,
};

export default TEXTOS;
