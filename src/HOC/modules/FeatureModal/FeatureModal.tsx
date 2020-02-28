import { useFeaturedContext } from 'fe/context/feature/useFeatureContext';
import { useMe } from 'fe/session/me';
import { useFormik } from 'formik';
import { Collection, Community } from 'graphql/types.generated';
import React, { FC, useMemo } from 'react';
import FeaturedModalUI, { Props } from 'ui/modules/FeaturedModal';

export type Context = Community | Collection;
export interface FeatureModal {
  ctx: Pick<Context, 'id' | '__typename' | 'name'>;
  isFeatured: boolean;
  done(): unknown;
}
export const FeatureModalHOC: FC<FeatureModal> = ({
  ctx,
  done,
  isFeatured
}) => {
  const { isAdmin } = useMe();
  const { toggleFeatured } = useFeaturedContext(ctx, isFeatured);

  const toggleFeaturedFormik = useFormik<{}>({
    initialValues: {},
    onSubmit: () => toggleFeatured().then(done)
  });

  const props = useMemo<null | Props>(() => {
    if (!isAdmin || typeof isFeatured !== 'boolean' || !ctx.__typename) {
      return null;
    }

    const props: Props = {
      isFeatured,
      cancel: done,
      itemName: ctx.name,
      itemType: ctx.__typename,
      formik: toggleFeaturedFormik
    };
    return props;
  }, [isAdmin, ctx, done, toggleFeaturedFormik]);

  return props && <FeaturedModalUI {...props} />;
};
