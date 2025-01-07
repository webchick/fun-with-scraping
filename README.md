# Scraping Shiny Occasions

Here are some notes:

- Seems JS is required for basic functionality => Playwright.

- URL structure:
  - **Location**:
    - City: `/d/COUNTRY--CITY/all-events/` (e.g. /d/canada--vancouver/all-events/)
    - Online: `/d/online/all-events/`
  - **Pagination**: `?page=X` (e.g. /d/canada--vancouver/all-events/?page=19)
  - **Format**: `/TYPE/` (e.g. /d/canada--vancouver/classes/)
    - Valid formats:
      - classes
      - conferences
      - festivals
      - parties
      - appearances
      - attractions
      - conventions
      - expos
      - galas
      - games
      - networking
      - performances
      - races
      - rallies
      - retreats
      - screenings
      - seminars
      - tournaments
      - tours
  - **Category**: `/CATEGORY--events/` (e.g. /d/canada--vancouver/food-and-drink--events/?page=2)
    - Categories are:
      - business
      - food-and-drink
      - health
      - music
      - auto-boat-and-air
      - charity-and-causes
      - community
      - family-and-education
      - fashion
      - film-and-media
      - hobbies
      - home-and-lifestyle
      - arts
      - government
      - spirituality
      - school-activities
      - science-and-tech
      - holiday
      - sports-and-fitness
      - travel-and-outdoor
      - other
  - **Date**: `&start_date=YYYY-MM-DD&end_date=YYYY-MM-DD` (e.g. /d/canada--vancouver/all-events/?page=1&start_date=2025-01-06&end_date=2025-01-09)
    - Also a few special URL-based filters:
      - `/events--today/` (e.g. /d/canada--vancouver/events--today/)
      - `/events--tomorrow/` (e.g. /d/canada--vancouver/events--tomorrow/)
      - `/events--this-weekend/` (e.g. /d/canada--vancouver/events--this-weekend/)
      - Note: If also filtering by a category, this precedes "events", e.g. /d/canada--vancouver/business--events--this-weekend/?page=1)
 - **Free vs. Paid**
    - `/free--events/` (e.g. /d/canada--vancouver/free--events/)
    - `/paid--events/` (e.g. /d/canada--vancouver/paid--events/?page=1)

## Page Structure

**Event listing**

```
<section>
  <ul class="SearchResultPanelContentEventCardList-module__eventList___2wk-D">
```

`document.querySelectorAll('section > ul > li > div.event-card');`

**Event Card**

TODO: `document.querySelectorAll('???')`

#root > div > div.eds-structure__body > div > div > div > div.eds-fixed-bottom-bar-layout__content > div > main > div > div > div > section.SearchPageContent-module__searchPanel___3TunM > div > section > div > div > section > ul > li:nth-child(2) > div > div > div.discover-search-desktop-card.discover-search-desktop-card--hiddeable > section > div > section.event-card-details > div > a

**Event Details**

```
<a href="/e/steelin-in-the-years-the-music-of-steely-dan-tickets-1080863244059?aff=ebdssbdestsearch" rel="noopener" target="_blank" class="event-card-link " aria-label="View Steelin' In The Years: The Music of Steely Dan" data-event-id="1080863244059" data-event-location="Vancouver, BC" data-event-paid-status="paid" data-event-category="music">
```

`document.querySelectorAll('.event-card > a.event-card-link')`
- aria-label (e.g. "View Steelin' In The Years: The Music of Steely Dan")
- data-event-category (e.g. "music")
- data-event-id (e.g. "1080863244059")
- data-event-location (e.g. "Vancouver, BC")
- data-event-paid-status (e.g. "paid")
- href (e.g. "/e/steelin-in-the-years-the-music-of-steely-dan-tickets-1080863244059?aff=ebdssbdestsearch")

## Sample Element

Full sample element on listing page:

```
<section class="horizontal-event-card__column" style="--HorizontalCardColumnMarginRight:24px"><a href="/e/steelin-in-the-years-the-music-of-steely-dan-tickets-1080863244059?aff=ebdssbdestsearch" rel="noopener" target="_blank" class="event-card-link " aria-label="View Steelin' In The Years: The Music of Steely Dan" data-event-id="1080863244059" data-event-location="Vancouver, BC" data-event-paid-status="paid" data-event-category="music"><div class="event-card-image__aspect-container" style="--image-aspect-ratio:2;--image-aspect-ratio-mobile:1;--image-width:220px;--image-width-mobile:100px;--image-background-color:#7b7564"><img height="256" width="512" class="event-card-image" src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F898668933%2F278048894574%2F1%2Foriginal.20241114-012434?h=200&amp;w=512&amp;auto=format%2Ccompress&amp;q=75&amp;sharp=10&amp;rect=0%2C57%2C1932%2C966&amp;s=685580ed157fab05809e0e0667ee9930" loading="eager" alt="Steelin' In The Years: The Music of Steely Dan primary image"></div></a></section><section style="--EventCardDetailsPadding:0 16px 0 0;--EventCardDetailsFlexGrow:2;--EventCardDetailsPosition:relative" class="event-card-details"><div class="Stack_root__1ksk7" style="--Space:4px"><aside class="DiscoverHorizontalEventCard-module__urgencySignals___9xnoI"><div class="EventCardUrgencySignal--going-fast EventCardUrgencySignal"><p class="Typography_root__487rx #585163 Typography_body-md-bold__487rx EventCardUrgencySignal__label Typography_align-match-parent__487rx" style="--TypographyColor:#585163">Going fast</p></div></aside><a href="/e/steelin-in-the-years-the-music-of-steely-dan-tickets-1080863244059?aff=ebdssbdestsearch" rel="noopener" target="_blank" class="event-card-link " aria-label="View Steelin' In The Years: The Music of Steely Dan" data-event-id="1080863244059" data-event-location="Vancouver, BC" data-event-paid-status="paid" data-event-category="music"><h3 class="Typography_root__487rx #3a3247 Typography_body-lg__487rx event-card__clamp-line--two Typography_align-match-parent__487rx" style="--TypographyColor:#3a3247">Steelin' In The Years: The Music of Steely Dan</h3></a><p class="Typography_root__487rx #585163 Typography_body-md__487rx event-card__clamp-line--one Typography_align-match-parent__487rx" style="--TypographyColor:#585163">Fri, Jan 17 •  7:00 PM </p><p class="Typography_root__487rx #585163 Typography_body-md__487rx event-card__clamp-line--one Typography_align-match-parent__487rx" style="--TypographyColor:#585163">Rickshaw Theatre</p><span></span><div class="DiscoverHorizontalEventCard-module__priceWrapper___3rOUY"><p class="Typography_root__487rx #3a3247 Typography_body-md-bold__487rx Typography_align-match-parent__487rx" style="--TypographyColor: #3a3247;">From $29.54</p></div></div></section><section class="event-card-actions DiscoverHorizontalEventCard-module__actions___2r3kR" data-event-id="1080863244059" data-event-location="Vancouver, BC" data-event-paid-status="paid" data-event-category="music"><span class="eds-icon-button eds-icon-button--neutral" data-spec="icon-button"><button class="eds-btn--button eds-btn--none eds-btn--icon-only" type="button"><i class="eds-vector-image eds-icon--small eds-vector-image--block" title="" data-spec="icon" data-testid="icon"><svg id="share-ios-chunky_svg__eds-icon--share-ios-chunky_svg" x="0" y="0" viewBox="0 0 24 24" xml:space="preserve"><path id="share-ios-chunky_svg__eds-icon--share-ios-chunky_base" fill-rule="evenodd" clip-rule="evenodd" d="M18 16v2H6v-2H4v4h16v-4z"></path><path id="share-ios-chunky_svg__eds-icon--share-ios-chunky_arrow" fill-rule="evenodd" clip-rule="evenodd" d="M12 4L7 9l1.4 1.4L11 7.8V16h2V7.8l2.6 2.6L17 9l-5-5z"></path></svg><span class="eds-is-hidden-accessible">Share this event: Steelin' In The Years: The Music of Steely Dan</span></i></button></span><span class="eds-icon-button eds-icon-button--neutral" data-spec="icon-button"><button aria-pressed="false" data-event-id="1080863244059" class="eds-btn--button eds-btn--none eds-btn--icon-only" type="button"><i class="eds-vector-image eds-icon--small eds-vector-image--grey-700 eds-vector-image--block" title="" data-spec="icon" data-testid="icon"><svg id="heart-chunky_svg__eds-icon--user-chunky_svg" x="0" y="0" viewBox="0 0 24 24" xml:space="preserve"><path id="heart-chunky_svg__eds-icon--heart-chunky_base" fill-rule="evenodd" clip-rule="evenodd" d="M18.8 6.2C18.1 5.4 17 5 16 5c-1 0-2 .4-2.8 1.2L12 7.4l-1.2-1.2C10 5.4 9 5 8 5c-1 0-2 .4-2.8 1.2-1.5 1.6-1.5 4.2 0 5.8l6.8 7 6.8-7c1.6-1.6 1.6-4.2 0-5.8zm-1.4 4.4L12 16.1l-5.4-5.5c-.8-.8-.8-2.2 0-3C7 7.2 7.5 7 8 7c.5 0 1 .2 1.4.6l2.6 2.7 2.7-2.7c.3-.4.8-.6 1.3-.6s1 .2 1.4.6c.8.8.8 2.2 0 3z"></path></svg><span class="eds-is-hidden-accessible">Save this event: Steelin' In The Years: The Music of Steely Dan</span></i></button></span></section></div>
```
