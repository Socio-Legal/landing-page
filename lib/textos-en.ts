/**
 * Textos de la web en inglés (public/locales/en), por namespace de i18next.
 * Solo lo importa el proveedor de ese idioma (components/providers-en.tsx),
 * así que cada página descarga los textos de su idioma y no los de los dos.
 */
import commonEN from "@/public/locales/en/common.json";
import cookieConsentEN from "@/public/locales/en/cookie-consent.json";
import homeClientsSectionEN from "@/public/locales/en/home-clients-section.json";
import homeCtaSectionEN from "@/public/locales/en/home-cta-section.json";
import homeFeaturesSectionEN from "@/public/locales/en/home-features-section.json";
import homeHeroSectionEN from "@/public/locales/en/home-hero-section.json";
import homePricingSectionEN from "@/public/locales/en/home-pricing-section.json";
import homeProductsSectionEN from "@/public/locales/en/home-products-section.json";
import homeTestimonialsSectionEN from "@/public/locales/en/home-testimonials-section.json";
import homeUsesSectionEN from "@/public/locales/en/home-uses-section.json";
import homeNumbersSectionEN from "@/public/locales/en/home-numbers-section.json";
import homeFlowsSectionEN from "@/public/locales/en/home-flows-section.json";
import homeIntegrationsSectionEN from "@/public/locales/en/home-integrations-section.json";
import homePricingAnchorEN from "@/public/locales/en/home-pricing-anchor.json";
import productHeroSectionEN from "@/public/locales/en/product-hero-section.json";
import productPartnerBookPageEN from "@/public/locales/en/product-partner-book-page.json";
import productIncentivePlansPageEN from "@/public/locales/en/product-incentive-plans-page.json";
import productShareholderMeetingsPageEN from "@/public/locales/en/product-shareholder-meetings-page.json";
import productCommunicationsSignaturesPageEN from "@/public/locales/en/product-communications-signatures-page.json";
import productOperationDraftsPageEN from "@/public/locales/en/product-operation-drafts-page.json";
import productSecondaryMarketPageEN from "@/public/locales/en/product-secondary-market-page.json";
import solutionsCompaniesPageEN from "@/public/locales/en/solutions-companies-page.json";
import solutionsLawyersPageEN from "@/public/locales/en/solutions-lawyers-page.json";
import solutionsStartupsPageEN from "@/public/locales/en/solutions-startups-page.json";
import solutionsInvestorsPageEN from "@/public/locales/en/solutions-investors-page.json";
import solutionsInvestorsDashboardPageEN from "@/public/locales/en/solutions-investors-dashboard-page.json";
import testimonialsPageEN from "@/public/locales/en/testimonials-page.json";
import testimonialsFactorialPageEN from "@/public/locales/en/testimonials-factorial-page.json";
import testimonialsCaballeroPageEN from "@/public/locales/en/testimonials-caballero-page.json";
import testimonialsPldspacePageEN from "@/public/locales/en/testimonials-pldspace-page.json";
import testimonialsTaxdownPageEN from "@/public/locales/en/testimonials-taxdown-page.json";
import testimonialsMyInvestorPageEN from "@/public/locales/en/testimonials-myinvestor-page.json";
import testimonialsAxaPageEN from "@/public/locales/en/testimonials-axa-page.json";
import testimonialsOsbornePageEN from "@/public/locales/en/testimonials-osborne-page.json";
import testimonialsFanalcaPageEN from "@/public/locales/en/testimonials-fanalca-page.json";
import testimonialsMultiversePageEN from "@/public/locales/en/testimonials-multiverse-page.json";
import testimonialsSadePageEN from "@/public/locales/en/testimonials-sade-page.json";
import pricingPageEN from "@/public/locales/en/pricing-page.json";
import resourcesGlossaryEN from "@/public/locales/en/resources-glossary.json";
import aboutPageEN from "@/public/locales/en/about-page.json";
import sttokVsExcelPageEN from "@/public/locales/en/sttok-vs-excel-page.json";
import legalDisclaimerPageEN from "@/public/locales/en/legal-disclaimer-page.json";
import legalSecurityPageEN from "@/public/locales/en/legal-security-page.json";
import legalPrivacyPageEN from "@/public/locales/en/legal-privacy-page.json";

const TEXTOS = {
common: commonEN,
"cookie-consent": cookieConsentEN,
"home-clients-section": homeClientsSectionEN,
"home-cta-section": homeCtaSectionEN,
"home-features-section": homeFeaturesSectionEN,
"home-hero-section": homeHeroSectionEN,
"home-pricing-section": homePricingSectionEN,
"home-products-section": homeProductsSectionEN,
"home-testimonials-section": homeTestimonialsSectionEN,
"home-uses-section": homeUsesSectionEN,
"home-numbers-section": homeNumbersSectionEN,
"home-flows-section": homeFlowsSectionEN,
"home-integrations-section": homeIntegrationsSectionEN,
"home-pricing-anchor": homePricingAnchorEN,

"product-hero-section": productHeroSectionEN,
"product-partner-book-page": productPartnerBookPageEN,
"product-incentive-plans-page": productIncentivePlansPageEN,
"product-shareholder-meetings-page": productShareholderMeetingsPageEN,
"product-communications-signatures-page": productCommunicationsSignaturesPageEN,
"product-operation-drafts-page": productOperationDraftsPageEN,
"product-secondary-market-page": productSecondaryMarketPageEN,

"solutions-companies-page": solutionsCompaniesPageEN,
"solutions-lawyers-page": solutionsLawyersPageEN,
"solutions-startups-page": solutionsStartupsPageEN,
"solutions-investors-page": solutionsInvestorsPageEN,
"solutions-investors-dashboard-page": solutionsInvestorsDashboardPageEN,

"testimonials-page": testimonialsPageEN,
"testimonials-factorial-page": testimonialsFactorialPageEN,
"testimonials-caballero-page": testimonialsCaballeroPageEN,
"testimonials-pldspace-page": testimonialsPldspacePageEN,
"testimonials-taxdown-page": testimonialsTaxdownPageEN,
"testimonials-myinvestor-page": testimonialsMyInvestorPageEN,
"testimonials-axa-page": testimonialsAxaPageEN,
"testimonials-osborne-page": testimonialsOsbornePageEN,
"testimonials-fanalca-page": testimonialsFanalcaPageEN,
"testimonials-multiverse-page": testimonialsMultiversePageEN,
"testimonials-sade-page": testimonialsSadePageEN,

"pricing-page": pricingPageEN,
"resources-glossary": resourcesGlossaryEN,
"about-page": aboutPageEN,
"sttok-vs-excel-page": sttokVsExcelPageEN,

"legal-privacy-page": legalPrivacyPageEN,
"legal-security-page": legalSecurityPageEN,
"legal-disclaimer-page": legalDisclaimerPageEN,
  };

export default TEXTOS;
