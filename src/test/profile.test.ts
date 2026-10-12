import { describe, expect, it } from "vitest";
import { CHAT_URL, CV_URL, LINKEDIN_URL, LOCATION_LINE, PERSON_NAME, PORTFOLIO_EMAIL, ROLE, YEARS_EXPERIENCE } from "@/data/profile";
import { YEARS_EXPERIENCE as commercialExperience } from "@/data/pricing";

describe("personal hiring profile", () => {
  it("uses Dave's personal identity", () => expect(PERSON_NAME).toBe("Dave Kelly"));
  it("uses the senior product role", () => expect(ROLE).toBe("Senior Product Designer"));
  it("shares over ten years of experience with commercial exports", () => {
    expect(YEARS_EXPERIENCE).toBe("over 10");
    expect(commercialExperience).toBe(YEARS_EXPERIENCE);
  });
  it("links the official CV", () => expect(CV_URL).toBe("/docs/DavidKelly_CV_2026.pdf"));
  it("uses the CV's email address", () => expect(PORTFOLIO_EMAIL).toBe("davekellydesign@gmail.com"));
  it("links Dave's LinkedIn", () => expect(LINKEDIN_URL).toBe("https://www.linkedin.com/in/davidkelly89/"));
  it("hides personal chat until a URL is supplied", () => expect(CHAT_URL).toBe(""));
  it("uses Dublin as the location", () => expect(LOCATION_LINE).toBe("Based in Dublin, Ireland"));
});