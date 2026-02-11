from rest_framework import serializers

from .models import Job


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = (
            "id",
            "company",
            "title",
            "description",
            "location",
            "salary_min",
            "salary_max",
            "job_type",
            "skills",
            "deadline",
            "status",
            "created_at",
        )
        read_only_fields = ("created_at",)
