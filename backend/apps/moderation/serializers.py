from rest_framework import serializers

from .models import EmployerVerification, JobReport


class JobReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobReport
        fields = ("id", "job", "reporter", "reason", "status", "created_at")
        read_only_fields = ("reporter", "created_at")


class EmployerVerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployerVerification
        fields = ("id", "company", "status", "notes", "updated_at")
        read_only_fields = ("updated_at",)
