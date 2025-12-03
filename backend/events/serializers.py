from rest_framework import serializers
from .models import Faculty, Department, Category, Location, Event
from users.serializers import UserSerializer

class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = ["id", "name", "abbreviation"]


class DepartmentSerializer(serializers.ModelSerializer):
    faculty = FacultySerializer(read_only=True)
    faculty_id = serializers.PrimaryKeyRelatedField(
        queryset=Faculty.objects.all(), source="faculty", write_only=True
    )

    class Meta:
        model = Department
        fields = ["id", "name", "faculty", "faculty_id"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ["id", "name", "address", "google_maps_link"]

# Serializer for Event model
class EventSerializer(serializers.ModelSerializer):
    organizer = UserSerializer(read_only=True)

    faculty = FacultySerializer(read_only=True)
    faculty_id = serializers.PrimaryKeyRelatedField(
        queryset=Faculty.objects.all(), source="faculty", write_only=True, allow_null=True
    )

    department = DepartmentSerializer(read_only=True)
    department_id = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.all(), source="department", write_only=True, allow_null=True
    )

    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source="category", write_only=True, allow_null=True
    )

    location = LocationSerializer(read_only=True)
    location_id = serializers.PrimaryKeyRelatedField(
        queryset=Location.objects.all(), source="location", write_only=True, allow_null=True
    )

    class Meta:
        model = Event
        fields = [
            "id", "organizer",
            "title", "description",
            "faculty", "faculty_id",
            "department", "department_id",
            "category", "category_id",
            "location", "location_id",
            "start_date", "end_date",
            "max_participants",
            "status",
            "image", "file",
            "created_at", "updated_at",
        ]
        read_only_fields = ["id", "organizer", "created_at", "updated_at", "status"]