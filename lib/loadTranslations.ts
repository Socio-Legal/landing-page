import common from "../public/locales/es/common.json";
import homeClientsSection from "../public/locales/es/home-clients-section.json";
import homeCtaSection from "../public/locales/es/home-cta-section.json";
import homeFeaturesSection from "../public/locales/es/home-features-section.json";
import homeHeroSection from "../public/locales/es/home-hero-section.json";
import homePricingSection from "../public/locales/es/home-pricing-section.json";
import homeProductsSection from "../public/locales/es/home-products-section.json";
import homeTestimonialsSection from "../public/locales/es/home-testimonials-section.json";
import homeUsesSection from "../public/locales/es/home-uses-section.json";

import productHeroSection from "../public/locales/es/product-hero-section.json";
import productPartnerBookPage from "../public/locales/es/product-partner-book-page.json";
import productIncentivePlansPage from "../public/locales/es/product-incentive-plans-page.json";
import productShareholderMeetingsPage from "../public/locales/es/product-shareholder-meetings-page.json";
import productOperationDraftsPage from "../public/locales/es/product-operation-drafts-page.json";

import solutionsPage from "../public/locales/es/solutions-page.json";
import solutionsCompaniesPage from "../public/locales/es/solutions-companies-page.json";
import solutionsLawyersPage from "../public/locales/es/solutions-lawyers-page.json";
import solutionsStartupsPage from "../public/locales/es/solutions-startups-page.json";
import solutionsInvestorsPage from "../public/locales/es/solutions-investors-page.json";
import solutionsInvestorsDashboardPage from "../public/locales/es/solutions-investors-dashboard-page.json";

import testimonialsPage from "../public/locales/es/testimonials-page.json";
import testimonialsFactorialPage from "../public/locales/es/testimonials-factorial-page.json";
import testimonialsBanktrackPage from "../public/locales/es/testimonials-banktrack-page.json";
import testimonialsCaballeroPage from "../public/locales/es/testimonials-caballero-page.json";
import testimonialsPldspacePage from "../public/locales/es/testimonials-pldspace-page.json";
import testimonialsTaxdownPage from "../public/locales/es/testimonials-taxdown-page.json";
import testimonialsYabaPage from "../public/locales/es/testimonials-yaba-page.json";

import pricingPage from "../public/locales/es/pricing-page.json";

import legalDisclaimerPage from "../public/locales/es/legal-disclaimer-page.json";
import legalSecurityPage from "../public/locales/es/legal-security-page.json";
import legalPrivacyPage from "../public/locales/es/legal-privacy-page.json";

import commonEN from "../public/locales/en/common.json";

import homeClientsSectionEN from "../public/locales/en/home-clients-section.json";
import homeCtaSectionEN from "../public/locales/en/home-cta-section.json";
import homeFeaturesSectionEN from "../public/locales/en/home-features-section.json";
import homeHeroSectionEN from "../public/locales/en/home-hero-section.json";
import homePricingSectionEN from "../public/locales/en/home-pricing-section.json";
import homeProductsSectionEN from "../public/locales/en/home-products-section.json";
import homeTestimonialsSectionEN from "../public/locales/en/home-testimonials-section.json";
import homeUsesSectionEN from "../public/locales/en/home-uses-section.json";

import productHeroSectionEN from "../public/locales/en/product-hero-section.json";
import productPartnerBookPageEN from "../public/locales/en/product-partner-book-page.json";
import productIncentivePlansPageEN from "../public/locales/en/product-incentive-plans-page.json";
import productShareholderMeetingsPageEN from "../public/locales/en/product-shareholder-meetings-page.json";
import productOperationDraftsPageEN from "../public/locales/en/product-operation-drafts-page.json";

import solutionsPageEN from "../public/locales/en/solutions-page.json";
import solutionsCompaniesPageEN from "../public/locales/en/solutions-companies-page.json";
import solutionsLawyersPageEN from "../public/locales/en/solutions-lawyers-page.json";
import solutionsStartupsPageEN from "../public/locales/en/solutions-startups-page.json";
import solutionsInvestorsPageEN from "../public/locales/en/solutions-investors-page.json";
import solutionsInvestorsDashboardPageEN from "../public/locales/en/solutions-investors-dashboard-page.json";

import testimonialsPageEN from "../public/locales/en/testimonials-page.json";

import pricingPageEN from "../public/locales/en/pricing-page.json";

import legalDisclaimerPageEN from "../public/locales/en/legal-disclaimer-page.json";
import legalSecurityPageEN from "../public/locales/en/legal-security-page.json";
import legalPrivacyPageEN from "../public/locales/en/legal-privacy-page.json";

const loadTranslations = (lang: "es" | "en") => {
  if (lang === "es") {
    return {
      common,
      "home-clients-section": homeClientsSection,
      "home-cta-section": homeCtaSection,
      "home-features-section": homeFeaturesSection,
      "home-hero-section": homeHeroSection,
      "home-pricing-section": homePricingSection,
      "home-products-section": homeProductsSection,
      "home-testimonials-section": homeTestimonialsSection,
      "home-uses-section": homeUsesSection,

      "product-hero-section": productHeroSection,
      "product-partner-book-page": productPartnerBookPage,
      "product-incentive-plans-page": productIncentivePlansPage,
      "product-shareholder-meetings-page": productShareholderMeetingsPage,
      "product-operation-drafts-page": productOperationDraftsPage,

      "solutions-page": solutionsPage,
      "solutions-companies-page": solutionsCompaniesPage,
      "solutions-lawyers-page": solutionsLawyersPage,
      "solutions-startups-page": solutionsStartupsPage,
      "solutions-investors-page": solutionsInvestorsPage,
      "solutions-investors-dashboard-page": solutionsInvestorsDashboardPage,

      "testimonials-page": testimonialsPage,
      "testimonials-factorial-page": testimonialsFactorialPage,
      "testimonials-banktrack-page": testimonialsBanktrackPage,
      "testimonials-caballero-page": testimonialsCaballeroPage,
      "testimonials-pldspace-page": testimonialsPldspacePage,
      "testimonials-taxdown-page": testimonialsTaxdownPage,
      "testimonials-yaba-page": testimonialsYabaPage,

      "pricing-page": pricingPage,

      "legal-privacy-page": legalPrivacyPage,
      "legal-security-page": legalSecurityPage,
      "legal-disclaimer-page": legalDisclaimerPage,
    };
  }

  return {
    common: commonEN,
    "home-clients-section": homeClientsSectionEN,
    "home-cta-section": homeCtaSectionEN,
    "home-features-section": homeFeaturesSectionEN,
    "home-hero-section": homeHeroSectionEN,
    "home-pricing-section": homePricingSectionEN,
    "home-products-section": homeProductsSectionEN,
    "home-testimonials-section": homeTestimonialsSectionEN,
    "home-uses-section": homeUsesSectionEN,

    "product-hero-section": productHeroSectionEN,
    "product-partner-book-page": productPartnerBookPageEN,
    "product-incentive-plans-page": productIncentivePlansPageEN,
    "product-shareholder-meetings-page": productShareholderMeetingsPageEN,
    "product-operation-drafts-page": productOperationDraftsPageEN,

    "solutions-page": solutionsPageEN,
    "solutions-companies-page": solutionsCompaniesPageEN,
    "solutions-lawyers-page": solutionsLawyersPageEN,
    "solutions-startups-page": solutionsStartupsPageEN,
    "solutions-investors-page": solutionsInvestorsPageEN,
    "solutions-investors-dashboard-page": solutionsInvestorsDashboardPageEN,

    "testimonials-page": testimonialsPageEN,

    "pricing-page": pricingPageEN,

    "legal-privacy-page": legalPrivacyPageEN,
    "legal-security-page": legalSecurityPageEN,
    "legal-disclaimer-page": legalDisclaimerPageEN,
  };
};

export default loadTranslations;
