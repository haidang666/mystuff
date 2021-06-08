import React, { useState, useEffect, useContext } from 'react';
import Helmet from 'react-helmet';
// import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import { Tab, Icon } from 'semantic-ui-react';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image,
  CarouselContext
} from 'pure-react-carousel';

import Layout from '@/Shared/Layout';
// import DeleteButton from '@/Shared/DeleteButton';
import TrashedMessage from '@/Shared/TrashedMessage';
import AddPageTab from './AddPageTab';
import InfoTab from './InfoTab';

function CurrentSideIndex() {
  const carouselContext = useContext(CarouselContext);
  const [currentSlide, setCurrentSlide] = useState(
    carouselContext.state.currentSlide
  );
  useEffect(() => {
    function onChange() {
      setCurrentSlide(carouselContext.state.currentSlide);
    }
    carouselContext.subscribe(onChange);
    return () => carouselContext.unsubscribe(onChange);
  }, [carouselContext]);
  return currentSlide + 1;
}

const Edit = () => {
  const { document, groups, pages } = usePage().props;

  // function destroy() {
  //   if (confirm('Are you sure you want to delete this contact?')) {
  //     Inertia.delete(route('contacts.destroy', document.id));
  //   }
  // }

  function restore() {
    // if (confirm('Are you sure you want to restore this contact?')) {
    //   Inertia.put(route('contacts.restore', document.id));
    // }
  }

  const panes = [
    { menuItem: '📓 Info', render: renderInfoTab },
    { menuItem: '🗂 Pages', render: renderPageTab },
    { menuItem: '➕ Add new page', render: renderAddPageTab }
  ];

  function renderAddPageTab() {
    return (
      <Tab.Pane>
        <AddPageTab />
      </Tab.Pane>
    );
  }

  function renderInfoTab() {
    return (
      <Tab.Pane>
        <InfoTab document={document} groups={groups} />
      </Tab.Pane>
    );
  }

  function carouselController() {
    return (
      <div className="flex justify-between content-center">
        <ButtonBack className="btn-indigo">Back</ButtonBack>
        <span className="pt-2">
          <CurrentSideIndex />/{pages?.length}
        </span>
        <ButtonNext className="btn-indigo">Next</ButtonNext>
      </div>
    );
  }

  function renderImageLoading() {
    return <Icon loading name="spinner" />;
  }

  function renderPageTab() {
    return (
      <Tab.Pane>
        {pages?.length ? (
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={pages.length}
          >
            {carouselController()}

            <div className="mt-1 mb-1">
              <Slider>
                {pages.map((page, idx) => {
                  return (
                    <Slide key={idx} tag="a" index={idx}>
                      <Image
                        src={page.photo_url}
                        renderLoading={renderImageLoading}
                      />
                    </Slide>
                  );
                })}
              </Slider>
            </div>

            {carouselController()}
          </CarouselProvider>
        ) : (
          <> Empty </>
        )}
      </Tab.Pane>
    );
  }

  return (
    <div>
      <Helmet title={`${document.name}`} />
      <h1 className="mb-8 text-3xl font-bold">
        <InertiaLink
          href={route('documents')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Documents
        </InertiaLink>
        <span className="mx-2 font-medium text-indigo-600">/</span>
        {document.name}{' '}
        {document.group_id && `(${groups[document.group_id - 1].text})`}
      </h1>
      {document.deleted_at && (
        <TrashedMessage onRestore={restore}>
          This document has been deleted.
        </TrashedMessage>
      )}

      <Tab panes={panes} />
    </div>
  );
};

Edit.layout = page => <Layout>{page}</Layout>;

export default Edit;
