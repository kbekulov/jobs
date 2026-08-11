# Vacancy data contract

Store vacancies in `data/vacancies.json` as one JSON array. Required fields:

```json
{
  "id": "stable-slug",
  "title": "Visible source title",
  "normalizedTitle": "Conservative normalized title",
  "company": "Visible employer name",
  "normalizedCompany": "Canonical employer name",
  "location": "Vilnius, Lithuania",
  "workMode": "onsite | hybrid | remote | unknown",
  "lithuaniaEligible": true,
  "roleFamilies": ["RPA Development"],
  "seniority": "",
  "source": "Official company careers",
  "directUrl": null,
  "supportingSourceUrl": null,
  "postingDate": null,
  "applicationDeadline": null,
  "postingAgeText": null,
  "salaryText": "€3,000–4,000 gross/month | Salary not disclosed",
  "status": "Newly found",
  "statusReason": "Evidence supporting the status",
  "relevanceScore": 0,
  "matchSummary": "Specific one-sentence relevance explanation.",
  "technologies": [],
  "keywordsMatched": [],
  "requirements": [],
  "requisitionId": null,
  "firstSeenAt": "ISO-8601 UTC",
  "lastSeenAt": "ISO-8601 UTC",
  "lastVerifiedAt": "ISO-8601 UTC",
  "sourceLastCheckedAt": "ISO-8601 UTC",
  "previousStatus": null,
  "statusChangedAt": "ISO-8601 UTC",
  "statusHistory": [{"status":"Newly found","at":"ISO-8601 UTC","reason":"..."}]
}
```

Allowed statuses are exactly `Newly found`, `Still open`, `Unknown`, and `Closed/Expired/No longer accepting applications`.

Deduplicate first by canonical company plus requisition ID. Without an ID, use canonical company plus normalized title plus location. Keep the source-visible title. Do not use a generic search page, employer home page, guessed URL, or tracking redirect as `directUrl`.

`salaryText` is required because compensation is a primary review signal. Copy only a source-verified range; otherwise use `Salary not disclosed`.
