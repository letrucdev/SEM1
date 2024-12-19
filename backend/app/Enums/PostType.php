<?php

namespace App\Enums;

enum PostType: string
{
    case PatientEdu = 'patient_edu';

    case ResearchDocument = 'research_document';

    case ProfressionalDocument = 'pro_document';

    case Resource = 'resource';

    case Video = 'video';

}
